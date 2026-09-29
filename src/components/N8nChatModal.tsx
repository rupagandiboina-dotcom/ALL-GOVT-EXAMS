import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  RotateCcw, 
  Settings, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown,
  Info
} from 'lucide-react';
import { SAMPLE_EXAMS } from '../data/examsData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: string;
  isError?: boolean;
  hint?: string;
}

interface N8nChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const DEFAULT_WEBHOOK_URL = 'https://rupadevi.app.n8n.cloud/webhook/832db9c7-b832-496f-99ad-1687f7ac6b2a/chat';
const TEST_WEBHOOK_URL = 'https://rupadevi.app.n8n.cloud/webhook-test/832db9c7-b832-496f-99ad-1687f7ac6b2a/chat';

export const N8nChatModal: React.FC<N8nChatModalProps> = ({ isOpen, onClose, initialQuery }) => {
  const [webhookUrl, setWebhookUrl] = useState<string>(() => {
    return localStorage.getItem('examradar_n8n_webhook') || DEFAULT_WEBHOOK_URL;
  });

  const [sessionId] = useState<string>(() => {
    let sid = localStorage.getItem('examradar_n8n_session_id');
    if (!sid) {
      sid = 'session-' + Math.random().toString(36).substring(2, 11);
      localStorage.setItem('examradar_n8n_session_id', sid);
    }
    return sid;
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('examradar_n8n_chat_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [
      {
        id: 'welcome-1',
        sender: 'bot',
        text: 'Namaste! 🙏 I am your **ExamRadar AI Assistant**, connected directly to your custom **n8n AI Agent**.\n\nAsk me about upcoming exam dates, vacancies, eligibility, qualifications, application deadlines, or syllabus patterns!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'warning' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Save chat history
  useEffect(() => {
    try {
      localStorage.setItem('examradar_n8n_chat_history', JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, isLoading]);

  // Handle initial query if passed
  useEffect(() => {
    if (isOpen && initialQuery && initialQuery.trim().length > 0) {
      handleSendMessage(initialQuery);
    }
  }, [isOpen, initialQuery]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async (customText?: string) => {
    const query = (customText || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputMessage('');
    setIsLoading(true);
    setConnectionStatus('idle');

    try {
      // Send payload according to n8n AI Chat Trigger format
      const payload = {
        action: 'sendMessage',
        sessionId: sessionId,
        chatInput: query,
        message: query
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*'
        },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();
      let botResponseText = '';
      let isErrorResponse = false;
      let hintMessage = '';

      if (!response.ok) {
        let parsedError: any = null;
        try {
          parsedError = JSON.parse(responseText);
        } catch {}

        if (response.status === 404 && parsedError?.hint) {
          // Standard n8n inactive workflow response
          botResponseText = `⚠️ **n8n Workflow Inactive / Unregistered**\n\n${parsedError.message}\n\n**To resolve:**\n1. Open your n8n workspace at [rupadevi.app.n8n.cloud](https://rupadevi.app.n8n.cloud)\n2. Open your Chat workflow\n3. Click the **Active** toggle in the top-right corner to publish it.\n*(Or switch to the Test Webhook while clicking "Execute workflow" in your canvas)*`;
          hintMessage = parsedError.hint;
          setConnectionStatus('warning');
          setStatusMessage('Workflow is currently inactive in n8n.');
        } else {
          botResponseText = `Server responded with status ${response.status}: ${parsedError?.message || responseText || 'Unknown error'}`;
          setConnectionStatus('error');
        }
        isErrorResponse = true;
      } else {
        // Success
        setConnectionStatus('success');
        setStatusMessage('Connected');
        try {
          const parsed = JSON.parse(responseText);
          if (typeof parsed === 'string') {
            botResponseText = parsed;
          } else if (parsed?.output) {
            botResponseText = typeof parsed.output === 'string' ? parsed.output : JSON.stringify(parsed.output);
          } else if (parsed?.text) {
            botResponseText = parsed.text;
          } else if (parsed?.response) {
            botResponseText = parsed.response;
          } else if (Array.isArray(parsed) && parsed.length > 0) {
            botResponseText = parsed[0]?.output || parsed[0]?.text || JSON.stringify(parsed[0]);
          } else {
            botResponseText = JSON.stringify(parsed, null, 2);
          }
        } catch {
          botResponseText = responseText;
        }
      }

      // If workflow was inactive or errored, offer smart local backup info so user is never stranded
      if (isErrorResponse) {
        const matchingExam = SAMPLE_EXAMS.find(e => 
          e.title.toLowerCase().includes(query.toLowerCase()) || 
          e.shortName.toLowerCase().includes(query.toLowerCase()) ||
          e.category.toLowerCase() === query.toLowerCase()
        );

        if (matchingExam) {
          botResponseText += `\n\n---\n📋 **Instant Local Reference for "${matchingExam.shortName}":**\n- **Status:** ${matchingExam.status}\n- **Vacancies:** ${matchingExam.vacancies ? matchingExam.vacancies.toLocaleString('en-IN') : 'To be announced'}\n- **Application Deadline:** ${matchingExam.importantDates?.find(d => d.isDeadline)?.date || matchingExam.lastDate}\n- **Official Portal:** [${matchingExam.organization}](${matchingExam.officialApplicationUrl || matchingExam.officialNotificationUrl})`;
        }
      }

      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: botResponseText || 'Received empty response from n8n agent.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: isErrorResponse,
        hint: hintMessage
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      setConnectionStatus('error');
      setStatusMessage('Network / CORS error connecting to n8n webhook.');

      // Check if query matches local exams
      const matching = SAMPLE_EXAMS.filter(e => 
        e.title.toLowerCase().includes(query.toLowerCase()) || 
        e.shortName.toLowerCase().includes(query.toLowerCase()) ||
        e.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 2);

      let fallbackText = `⚠️ **Could not connect to n8n webhook:** ${err.message || 'Network error'}\n\nPlease check that your n8n workflow is active and CORS allows incoming requests.`;
      
      if (matching.length > 0) {
        fallbackText += `\n\n💡 **ExamRadar Database match for your query:**`;
        matching.forEach(m => {
          fallbackText += `\n• **${m.shortName}** (${m.category}): ${m.status}, ${m.vacancies ? m.vacancies.toLocaleString('en-IN') + ' vacancies' : 'Notification pending'}. Apply at: ${m.officialApplicationUrl || m.officialNotificationUrl}`;
        });
      }

      setMessages(prev => [
        ...prev,
        {
          id: 'error-' + Date.now(),
          sender: 'bot',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    const welcome: ChatMessage = {
      id: 'welcome-' + Date.now(),
      sender: 'bot',
      text: 'Chat history cleared. How can I help you today regarding Indian government exams and recruitment cycles?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([welcome]);
    try {
      localStorage.removeItem('examradar_n8n_chat_history');
    } catch {}
  };

  const samplePrompts = [
    'Which SSC exams are open right now?',
    'What is the age limit for UPSC Civil Services?',
    'Tell me about BPSC 70th CCE eligibility and pattern',
    'What are the upcoming Railway RRB exams in 2026-27?'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end animate-in fade-in slide-in-from-bottom-5 duration-200">
      {/* Chat Window */}
      <div 
        className={`w-[92vw] sm:w-[440px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-200 ${
          isMinimized ? 'h-14' : 'h-[620px] max-h-[85vh]'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white px-4 py-3 flex items-center justify-between shadow-sm select-none">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center text-white border border-white/30">
                <Bot className="w-5 h-5" />
              </div>
              <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-indigo-700 ${
                connectionStatus === 'warning' ? 'bg-amber-400' :
                connectionStatus === 'error' ? 'bg-rose-400' : 'bg-emerald-400'
              }`} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-sm tracking-tight leading-tight">ExamRadar AI Agent</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 bg-white/20 rounded">n8n</span>
              </div>
              <p className="text-[11px] text-indigo-100/90 leading-tight">
                {isLoading ? 'Thinking & querying...' : 'Online • Ready for exam queries'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowSettings(!showSettings)}
              title="Webhook Settings"
              className="p-1.5 rounded-lg hover:bg-white/15 text-indigo-100 hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={clearChat}
              title="Reset Conversation"
              className="p-1.5 rounded-lg hover:bg-white/15 text-indigo-100 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              title={isMinimized ? 'Expand' : 'Minimize'}
              className="p-1.5 rounded-lg hover:bg-white/15 text-indigo-100 hover:text-white transition-colors"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              title="Close Chat"
              className="p-1.5 rounded-lg hover:bg-white/15 text-indigo-100 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Settings Drawer / Flyout */}
        {showSettings && !isMinimized && (
          <div className="bg-slate-50 dark:bg-slate-800/95 border-b border-slate-200 dark:border-slate-700 p-3.5 text-xs space-y-2.5 animate-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
              <span className="flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                n8n Webhook Configuration
              </span>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Done
              </button>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                Active Webhook Endpoint:
              </label>
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => {
                  setWebhookUrl(e.target.value);
                  localStorage.setItem('examradar_n8n_webhook', e.target.value);
                }}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-[11px] focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => {
                  setWebhookUrl(DEFAULT_WEBHOOK_URL);
                  localStorage.setItem('examradar_n8n_webhook', DEFAULT_WEBHOOK_URL);
                }}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  webhookUrl === DEFAULT_WEBHOOK_URL
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                }`}
              >
                Production Webhook
              </button>
              <button
                onClick={() => {
                  setWebhookUrl(TEST_WEBHOOK_URL);
                  localStorage.setItem('examradar_n8n_webhook', TEST_WEBHOOK_URL);
                }}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  webhookUrl === TEST_WEBHOOK_URL
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                }`}
              >
                Test Webhook
              </button>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
              💡 Remember to toggle your workflow to <strong>Active</strong> in the n8n canvas so production calls succeed.
            </p>
          </div>
        )}

        {/* Chat Body */}
        {!isMinimized && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm bg-slate-50/50 dark:bg-slate-950/40">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                  >
                    <div
                      className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 leading-relaxed text-sm shadow-sm ${
                        isUser
                          ? 'bg-indigo-600 text-white rounded-tr-xs'
                          : msg.isError
                          ? 'bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-slate-800 dark:text-slate-200 rounded-tl-xs'
                          : 'bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 rounded-tl-xs'
                      }`}
                    >
                      {/* Message Content with basic Markdown formatting */}
                      <div className="whitespace-pre-wrap break-words">
                        {renderFormattedMessage(msg.text)}
                      </div>

                      {msg.hint && (
                        <div className="mt-2 pt-2 border-t border-amber-200 dark:border-amber-800/80 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-1.5">
                          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span>{msg.hint}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 px-1 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-2.5 rounded-2xl rounded-tl-xs w-fit shadow-sm">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce"></span>
                  </div>
                  <span className="text-xs font-medium">Consulting n8n AI agent...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Prompt Starter Pills (visible when conversation is young) */}
            {messages.length <= 2 && (
              <div className="px-3 py-2 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0 ml-1" />
                {samplePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="shrink-0 text-xs bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-end gap-2"
              >
                <div className="relative flex-1">
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    rows={1}
                    placeholder="Ask anything about govt exams (SSC, UPSC, RRB)..."
                    className="w-full resize-none px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 max-h-28"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  aria-label="Send message"
                  className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 px-1">
                <span>Webhook: <code className="font-mono text-[9px] text-slate-500 dark:text-slate-400">...832db9c7/chat</code></span>
                <span>Press Enter to send</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Simple Markdown parser helper for rich exam details
function renderFormattedMessage(text: string) {
  // If text contains markdown bold (**text**) or links [label](url)
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5">
      {lines.map((line, lIdx) => {
        if (!line.trim()) {
          return <div key={lIdx} className="h-1" />;
        }

        // Parse bold and links
        const parts = [];
        let remaining = line;
        let pIdx = 0;

        // Process markdown syntax
        const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
        let match;
        let lastIndex = 0;

        while ((match = regex.exec(line)) !== null) {
          if (match.index > lastIndex) {
            parts.push(<span key={pIdx++}>{line.substring(lastIndex, match.index)}</span>);
          }

          const matchedStr = match[0];
          if (matchedStr.startsWith('**') && matchedStr.endsWith('**')) {
            parts.push(
              <strong key={pIdx++} className="font-semibold text-slate-900 dark:text-white">
                {matchedStr.slice(2, -2)}
              </strong>
            );
          } else if (matchedStr.startsWith('[') && matchedStr.includes('](')) {
            const label = matchedStr.substring(1, matchedStr.indexOf(']('));
            const url = matchedStr.substring(matchedStr.indexOf('](') + 2, matchedStr.length - 1);
            parts.push(
              <a
                key={pIdx++}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 underline font-medium hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center gap-0.5"
              >
                {label}
                <ExternalLink className="w-2.5 h-2.5 inline" />
              </a>
            );
          }
          lastIndex = regex.lastIndex;
        }

        if (lastIndex < line.length) {
          parts.push(<span key={pIdx++}>{line.substring(lastIndex)}</span>);
        }

        return <div key={lIdx}>{parts.length > 0 ? parts : line}</div>;
      })}
    </div>
  );
}
