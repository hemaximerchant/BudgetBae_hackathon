"use client"

import { useState } from "react"
import { Search, Plus, Bell, Home, Briefcase, FileText, CreditCard, PieChart, Settings, ChevronRight, ChevronDown } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

export default function ExpenseDashboard() {
  const [activeView, setActiveView] = useState("admin")

  const monthlyData = [
    { name: "APR", value: 20000 },
    { name: "MAY", value: 40000 },
    { name: "JUN", value: 110000 },
    { name: "JUL", value: 90000 },
    { name: "AUG", value: 140000 },
    { name: "SEP", value: 180000 },
    { name: "OCT", value: 200000 },
    { name: "NOV", value: 200000 },
    { name: "DEC", value: 180000 },
    { name: "JAN", value: 150000 },
    { name: "FEB", value: 140000 },
    { name: "MAR", value: 120000 },
  ]

  const topSpendingUsers = [
    { name: "Ananya", email: "ananya@zyker.com", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Kabir", email: "kabir@zyker.com", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Kavin", email: "kavin@zyker.com", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Diana", email: "diana@zyker.com", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Jack", email: "jack@zyker.com", avatar: "/placeholder.svg?height=40&width=40" },
  ]

  const pendingTrips = [
    { approver: "Laura", email: "laura@zyker.com", avatar: "/placeholder.svg?height=40&width=40", count: 1 },
    { approver: "Rupesh", email: "rupesh@zyker.com", avatar: "/placeholder.svg?height=40&width=40", count: 4 },
    { approver: "Sahil", email: "sahil@zyker.com", avatar: "/placeholder.svg?height=40&width=40", count: 8 },
    { approver: "Eevan", email: "eevan@zyker.com", avatar: "/placeholder.svg?height=40&width=40", count: 2 },
  ]

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#0a2351] text-white">
        <div className="flex items-center">
          <div className="text-2xl font-semibold flex items-center">
            <span className="text-3xl mr-1">⟨⟩</span> Expense
          </div>
        </div>
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              className="w-full bg-[#0f3169] border-none pl-10 text-white placeholder:text-gray-400 focus-visible:ring-0"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-1.5 rounded-full bg-[#0f3169] hover:bg-[#1a4283]">
            <Plus size={20} />
          </button>
          <button className="p-1.5 rounded-full bg-[#0f3169] hover:bg-[#1a4283]">
            <Bell size={20} />
          </button>
          <Avatar className="h-9 w-9 border-2 border-[#1a4283]">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 overflow-y-auto">
          <nav className="p-2">
            <div className="mb-1">
              <button 
                className="flex items-center justify-between w-full p-3 text-left font-medium hover:bg-gray-200 rounded-md"
                onClick={() => setActiveView(activeView === "my" ? "" : "my")}
              >
                <span>My View</span>
                <ChevronRight size={18} />
              </button>
            </div>

            <div>
              <button 
                className="flex items-center justify-between w-full p-3 text-left font-medium hover:bg-gray-200 rounded-md"
                onClick={() => setActiveView(activeView === "admin" ? "" : "admin")}
              >
                <span>Admin View</span>
                <ChevronDown size={18} />
              </button>
              
              {activeView === "admin" && (
                <div className="ml-2 mt-1 space-y-0.5">
                  <button className="flex items-center w-full p-3 text-left rounded-md bg-white shadow-sm">
                    <Home size={18} className="mr-3 text-gray-600" />
                    <span className="font-medium">Dashboard</span>
                  </button>
                  <button className="flex items-center w-full p-3 text-left text-gray-600 hover:bg-gray-200 rounded-md">
                    <Briefcase size={18} className="mr-3" />
                    <span>Trips</span>
                  </button>
                  <button className="flex items-center w-full p-3 text-left text-gray-600 hover:bg-gray-200 rounded-md">
                    <FileText size={18} className="mr-3" />
                    <span>Reports</span>
                  </button>
                  <button className="flex items-center w-full p-3 text-left text-gray-600 hover:bg-gray-200 rounded-md">
                    <CreditCard size={18} className="mr-3" />
                    <span>Advances</span>
                  </button>
                  <button className="flex items-center w-full p-3 text-left text-gray-600 hover:bg-gray-200 rounded-md">
                    <CreditCard size={18} className="mr-3" />
                    <span>Corporate Cards</span>
                  </button>
                  <button className="flex items-center w-full p-3 text-left text-gray-600 hover:bg-gray-200 rounded-md">
                    <FileText size={18} className="mr-3" />
                    <span>Budgets</span>
                  </button>
                  <button className="flex items-center w-full p-3 text-left text-gray-600 hover:bg-gray-200 rounded-md">
                    <PieChart size={18} className="mr-3" />
                    <span>Analytics</span>
                  </button>
                  <button className="flex items-center w-full p-3 text-left text-gray-600 hover:bg-gray-200 rounded-md">
                    <Settings size={18} className="mr-3" />
                    <span>Settings</span>
                  </button>
                </div>
              )}
            </div>
          </nav>
        </aside>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Spend Summary */}
            <div className="lg:col-span-2 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <h2 className="text-sm font-medium text-gray-500 mb-4">SPEND SUMMARY</h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis 
                      domain={[0, 200000]} 
                      ticks={[0, 50000, 100000, 150000, 200000]} 
                      tickFormatter={(value) => `${value / 1000}k`}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Overall Summary */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <h2 className="text-sm font-medium text-gray-500 mb-4">OVERALL SUMMARY</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-red-200 flex items-center justify-center mr-4">
                    <FileText className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Expense</p>
                    <p className="text-xl font-semibold">$200.00</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mr-4">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Advances</p>
                    <p className="text-xl font-semibold">$60.00</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <FileText className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Reimbursements</p>
                    <p className="text-xl font-semibold">$100.00</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                    <Briefcase className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Trips</p>
                    <p className="text-xl font-semibold">80</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Policy Violations */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <h2 className="text-sm font-medium text-gray-500 mb-4">TOP POLICY VIOLATIONS</h2>
              <div className="flex justify-center mb-4">
                <svg width="180" height="180" viewBox="0 0 180 180">
                  <circle cx="90" cy="90" r="70" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                  <circle 
                    cx="90" 
                    cy="90" 
                    r="70" 
                    fill="none" 
                    stroke="#ef4444" 
                    strokeWidth="20" 
                    strokeDasharray="439.6" 
                    strokeDashoffset="285.3" 
                    transform="rotate(-90 90 90)" 
                  />
                  <circle 
                    cx="90" 
                    cy="90" 
                    r="70" 
                    fill="none" 
                    stroke="#000000" 
                    strokeWidth="20" 
                    strokeDasharray="439.6" 
                    strokeDashoffset="154.5" 
                    transform="rotate(37.7 90 90)" 
                  />
                  <circle 
                    cx="90" 
                    cy="90" 
                    r="70" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="20" 
                    strokeDasharray="439.6" 
                    strokeDashoffset="154.5" 
                    transform="rotate(154.5 90 90)" 
                  />
                </svg>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 mr-2"></div>
                  <span className="text-sm">(35.14%)-Expense amount limit</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black mr-2"></div>
                  <span className="text-sm">(32.43%)-Description mandatory</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 mr-2"></div>
                  <span className="text-sm">(32.43%)-Receipt required limit</span>
                </div>
              </div>
            </div>

            {/* Top Spending Users */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <h2 className="text-sm font-medium text-gray-500 mb-4">TOP SPENDING USERS</h2>
              <div className="space-y-4">
                {topSpendingUsers.map((user, index) => (
                  <div key={index} className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Trips */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <h2 className="text-sm font-medium text-gray-500 mb-4">PENDING TRIPS</h2>
              <div className="flex justify-between mb-4">
                <span className="text-xs font-medium text-gray-500">APPROVER</span>
                <span className="text-xs font-medium text-gray-500">COUNT</span>
              </div>
              <div className="space-y-4">
                {pendingTrips.map((trip, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={trip.avatar || "/placeholder.svg"} alt={trip.approver} />
                        <AvatarFallback>{trip.approver.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{trip.approver}</p>
                        <p className="text-sm text-gray-500">{trip.email}</p>
                      </div>
                    </div>
                    <div className="font-semibold text-lg">{trip.count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
