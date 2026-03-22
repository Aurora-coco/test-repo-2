import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  Cpu,
  Database,
  Play,
  Power,
  RefreshCw,
  Zap,
  TrendingUp,
  Clock,
  Search,
  Bell,
  Settings,
  ChevronDown,
} from "lucide-react";

// --- Mock Data ---
const MODELS = [
  { id: 1, name: "GPT-4o", version: "2024-11-20", status: "running", rate: "1,240 tok/s", icon: "🧠" },
  { id: 2, name: "Claude Sonnet 4", version: "2025-05-14", status: "running", rate: "980 tok/s", icon: "🔷" },
  { id: 3, name: "Gemini 2.0 Flash", version: "2025-02-01", status: "stopped", rate: "—", icon: "💎" },
  { id: 4, name: "DeepSeek V3", version: "2024-12-26", status: "running", rate: "2,100 tok/s", icon: "🌊" },
  { id: 5, name: "Qwen Max", version: "2025-03-01", status: "stopped", rate: "—", icon: "☁️" },
];

const LOGS = [
  { id: 1, model: "GPT-4o", tokens: "4,832", latency: "1.2s", time: "2 分钟前", status: "success" },
  { id: 2, model: "Claude Sonnet 4", tokens: "2,104", latency: "0.8s", time: "5 分钟前", status: "success" },
  { id: 3, model: "DeepSeek V3", tokens: "12,580", latency: "2.1s", time: "8 分钟前", status: "success" },
  { id: 4, model: "GPT-4o", tokens: "892", latency: "3.4s", time: "12 分钟前", status: "error" },
  { id: 5, model: "Claude Sonnet 4", tokens: "6,200", latency: "1.5s", time: "15 分钟前", status: "success" },
  { id: 6, model: "Qwen Max", tokens: "3,440", latency: "0.6s", time: "18 分钟前", status: "success" },
];

// --- Sub-Components ---
function QuotaCard() {
  const used = 82;
  const remaining = 100 - used;
  const isLow = remaining <= 20;

  return (
    <div
      className={`rounded-2xl border p-6 ${
        isLow
          ? "border-red-200 bg-gradient-to-br from-red-50 to-white"
          : "border-gray-200 bg-gradient-to-br from-blue-50 to-white"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">本月剩余额度</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className={`text-5xl font-bold tracking-tight ${isLow ? "text-red-600" : "text-gray-900"}`}>
              {remaining.toLocaleString()}
            </span>
            <span className="text-lg text-gray-400">/ 10,000 次</span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            已使用 <span className="font-medium text-gray-700">{used}%</span> · 预计剩余 <span className="font-medium text-gray-700">6 天</span>
          </p>
        </div>
        {isLow && (
          <div className="flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
            <AlertTriangle className="h-3.5 w-3.5" />
            额度紧张
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isLow ? "bg-red-500" : "bg-blue-500"
            }`}
            style={{ width: `${used}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${
            isLow
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <Zap className="h-4 w-4" />
          立即续费
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          查看账单
        </button>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, color }: any) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    purple: "bg-violet-50 text-violet-600",
    orange: "bg-amber-50 text-amber-600",
  };
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <div className={`rounded-lg p-2.5 ${colors[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {sub && <p className="text-xs text-gray-400">{sub}</p>}
        </div>
      </div>
    </div>
  );
}

function ModelTable() {
  const [models, setModels] = useState(MODELS);

  const toggleStatus = (id: number) => {
    setModels((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              status: m.status === "running" ? "stopped" : "running",
              rate: m.status === "running" ? "—" : `${Math.floor(Math.random() * 2000 + 500)} tok/s`,
            }
          : m
      )
    );
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="text-base font-semibold text-gray-900">模型列表</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50 text-gray-500">
              <th className="px-5 py-3 font-medium">模型</th>
              <th className="px-5 py-3 font-medium">版本</th>
              <th className="px-5 py-3 font-medium">状态</th>
              <th className="px-5 py-3 font-medium">消耗速率</th>
              <th className="px-5 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {models.map((m) => (
              <tr key={m.id} className="transition-colors hover:bg-gray-50/50">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{m.icon}</span>
                    <span className="font-medium text-gray-900">{m.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-gray-500">{m.version}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      m.status === "running"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        m.status === "running" ? "bg-emerald-500" : "bg-gray-400"
                      }`}
                    />
                    {m.status === "running" ? "运行中" : "已停止"}
                  </span>
                </td>
                <td className="px-5 py-3.5 font-mono text-sm text-gray-600">{m.rate}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleStatus(m.id)}
                      className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                        m.status === "running"
                          ? "text-red-600 hover:bg-red-50"
                          : "text-emerald-600 hover:bg-emerald-50"
                      }`}
                    >
                      {m.status === "running" ? (
                        <>
                          <Power className="h-3 w-3" /> 停止
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3" /> 启动
                        </>
                      )}
                    </button>
                    <button className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100">
                      <RefreshCw className="h-3 w-3" /> 重置
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UsageLogs() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <h2 className="text-base font-semibold text-gray-900">最近调用记录</h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          查看全部
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50 text-gray-500">
              <th className="px-5 py-3 font-medium">模型</th>
              <th className="px-5 py-3 font-medium">Token 消耗</th>
              <th className="px-5 py-3 font-medium">延迟</th>
              <th className="px-5 py-3 font-medium">状态</th>
              <th className="px-5 py-3 font-medium">时间</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {LOGS.map((log) => (
              <tr key={log.id} className="transition-colors hover:bg-gray-50/50">
                <td className="px-5 py-3.5 font-medium text-gray-900">{log.model}</td>
                <td className="px-5 py-3.5 font-mono text-gray-600">{log.tokens}</td>
                <td className="px-5 py-3.5 text-gray-500">{log.latency}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                      log.status === "success"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {log.status === "success" ? "成功" : "失败"}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-gray-400">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Main Dashboard ---
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Nav */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-sm font-bold text-white">
              M
            </div>
            <span className="text-sm font-semibold text-gray-900">ModelHub</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
              <Bell className="h-5 w-5" />
            </button>
            <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
              <Settings className="h-5 w-5" />
            </button>
            <button className="ml-1 flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aurora"
                alt="avatar"
                className="h-6 w-6 rounded-full"
              />
              Aurora
              <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">仪表盘</h1>
          <p className="mt-1 text-sm text-gray-500">模型使用情况概览与管理</p>
        </div>

        {/* Quota Card — 视觉中心 */}
        <QuotaCard />

        {/* Stat Cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Cpu} label="活跃模型" value="3" sub="/ 5 个总模型" color="blue" />
          <StatCard icon={TrendingUp} label="今日调用" value="1,847" sub="较昨日 +12%" color="green" />
          <StatCard icon={Database} label="今日 Token" value="52.4K" sub="≈ $1.82" color="purple" />
          <StatCard icon={Clock} label="平均延迟" value="1.3s" sub="P99: 3.2s" color="orange" />
        </div>

        {/* Model Table */}
        <div className="mt-8">
          <ModelTable />
        </div>

        {/* Usage Logs */}
        <div className="mt-8">
          <UsageLogs />
        </div>
      </main>
    </div>
  );
}
