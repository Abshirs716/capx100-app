import React, { useState } from 'react'
import { 
  BarChart3, Shield, Award, FileText, ClipboardList, Eye,
  DollarSign, Building2, Settings, HelpCircle,
  Sun, Moon, ArrowLeft, TrendingUp, Wallet
} from 'lucide-react'
import { CSVUploader } from './components/portfolio/CSVUploader'
import { ParseResult } from './types/portfolio'
import { RiskAnalysis } from './components/portfolio/RiskAnalysis'
import { PerformanceCharts } from './components/portfolio/PerformanceCharts'
import { SectorAnalysis } from './components/portfolio/SectorAnalysis'

type NavigationView = 'dashboard' | 'analytics' | 'risk' | 'gips' | 'reports' | 'holdings' | 'sector' | 'tax' | 'xray' | 'costbasis' | 'settings' | 'support'

function App() {
  const [parseResult, setParseResult] = useState<ParseResult | null>(null)
  const [currentView, setCurrentView] = useState<NavigationView>('dashboard')
  const [isDarkMode, setIsDarkMode] = useState(true)

  const handleCSVUpload = (data: ParseResult) => {
    setParseResult(data)
  }

  const totalValue = parseResult ? 
    parseResult.holdings.reduce((sum, h) => sum + h.marketValue, 0) : 0

  const dashboardCards = [
    {
      id: 'analytics',
      title: 'Portfolio Analytics',
      subtitle: 'Performance & P&L',
      icon: BarChart3,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'risk',
      title: 'Risk Analysis',
      subtitle: 'Sharpe, Beta, VaR',
      icon: Shield,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'holdings',
      title: 'Holdings Details',
      subtitle: parseResult ? `${parseResult.holdings.length} positions` : 'Full portfolio',
      icon: ClipboardList,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'sector',
      title: 'Sector Analysis',
      subtitle: 'Diversification',
      icon: Building2,
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 'gips',
      title: 'GIPS Compliance',
      subtitle: 'Audit ready',
      icon: Award,
      color: 'from-amber-500 to-amber-600',
      premium: true
    },
    {
      id: 'tax',
      title: 'Tax Loss Harvesting',
      subtitle: 'Save $10K+',
      icon: DollarSign,
      color: 'from-red-500 to-red-600',
      premium: true
    },
    {
      id: 'reports',
      title: 'Reports & Export',
      subtitle: 'PDF generation',
      icon: FileText,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'xray',
      title: 'Data X-Ray',
      subtitle: '100% transparent',
      icon: Eye,
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 'costbasis',
      title: 'Cost Basis',
      subtitle: 'Tax tracking',
      icon: Wallet,
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'settings',
      title: 'Settings',
      subtitle: 'Configuration',
      icon: Settings,
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 'support',
      title: 'Support',
      subtitle: '24/7 help',
      icon: HelpCircle,
      color: 'from-slate-500 to-slate-600'
    }
  ]

  // Performance Component with Transparency
  const PerformanceAnalysis = () => {
    if (!parseResult) return null
    
    const [showCalculations, setShowCalculations] = useState(false)
    
    const totalGain = parseResult.holdings.reduce((sum, h) => sum + h.unrealizedGain, 0)
    const totalCost = parseResult.holdings.reduce((sum, h) => sum + h.costBasis, 0)
    const percentGain = totalCost > 0 ? (totalGain / totalCost * 100) : 0
    const topHoldings = parseResult.holdings
      .sort((a, b) => b.marketValue - a.marketValue)
      .slice(0, 5)

    return (
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-lg`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <TrendingUp className="mr-2 text-blue-500" />
            Performance Analysis
          </h2>
          <button
            onClick={() => setShowCalculations(!showCalculations)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Eye size={18} />
            {showCalculations ? 'Hide' : 'Show'} Calculations
          </button>
        </div>
        
        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <p className="text-sm text-gray-500 mb-1">Total Value</p>
            <p className="text-xl font-bold">${totalValue.toLocaleString()}</p>
            {showCalculations && (
              <p className="text-xs text-blue-400 mt-1">Σ(shares × price)</p>
            )}
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <p className="text-sm text-gray-500 mb-1">Total Gain/Loss</p>
            <p className={`text-xl font-bold ${totalGain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ${totalGain.toLocaleString()}
            </p>
            {showCalculations && (
              <p className="text-xs text-blue-400 mt-1">Market Value - Cost Basis</p>
            )}
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <p className="text-sm text-gray-500 mb-1">Return %</p>
            <p className={`text-xl font-bold ${percentGain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {percentGain.toFixed(2)}%
            </p>
            {showCalculations && (
              <p className="text-xs text-blue-400 mt-1">(Gain ÷ Cost) × 100</p>
            )}
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <p className="text-sm text-gray-500 mb-1">Holdings</p>
            <p className="text-xl font-bold">{parseResult.holdings.length}</p>
            {showCalculations && (
              <p className="text-xs text-blue-400 mt-1">Count of positions</p>
            )}
          </div>
        </div>

        {/* Transparency Box - Show Calculations */}
        {showCalculations && (
          <div className={`mb-6 p-4 rounded-lg border-2 border-blue-500 ${
            isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'
          }`}>
            <h3 className="font-bold text-sm mb-3 text-blue-500 flex items-center">
              <Eye className="mr-2" size={16} />
              100% TRANSPARENT CALCULATIONS
            </h3>
            <div className="space-y-2 text-xs font-mono">
              <div>Total Value = {parseResult.holdings.map((h, i) => 
                `${i > 0 ? ' + ' : ''}(${h.shares} × $${h.currentPrice.toFixed(2)})`
              ).slice(0, 3).join('')}{parseResult.holdings.length > 3 ? '...' : ''}</div>
              <div>Total Gain = ${totalValue.toFixed(2)} - ${totalCost.toFixed(2)} = ${totalGain.toFixed(2)}</div>
              <div>Return % = (${totalGain.toFixed(2)} ÷ ${totalCost.toFixed(2)}) × 100 = {percentGain.toFixed(2)}%</div>
              <div className="pt-2 text-yellow-500">
                ⚡ No black box algorithms - Every calculation visible and verifiable
              </div>
            </div>
          </div>
        )}

        {/* Top Holdings */}
        <h3 className="text-lg font-semibold mb-3">Top 5 Holdings</h3>
        <div className="space-y-2">
          {topHoldings.map((holding, idx) => (
            <div key={idx} className={`p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{holding.symbol}</span>
                  <span className="text-sm text-gray-500 ml-2">{holding.shares} shares</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">${holding.marketValue.toLocaleString()}</p>
                  <p className={`text-sm ${holding.unrealizedGain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {holding.unrealizedGainPercent.toFixed(2)}%
                  </p>
                </div>
              </div>
              {showCalculations && (
                <div className="mt-2 text-xs text-blue-400 font-mono">
                  Value: {holding.shares} × ${holding.currentPrice.toFixed(2)} = ${holding.marketValue.toFixed(2)}
                  {' | '}
                  Gain: ${holding.marketValue.toFixed(2)} - ${holding.costBasis.toFixed(2)} = ${holding.unrealizedGain.toFixed(2)}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* USP Footer */}
        <div className={`mt-6 p-3 text-center rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <p className="text-sm font-semibold text-blue-500">
            🔍 Our Promise: 100% Transparency - Every Calculation Shown
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Unlike Morningstar's black box, we show you exactly how every number is calculated
          </p>
        </div>
      </div>
    )
  }

  // Holdings Table Component
  const HoldingsTable = () => {
    if (!parseResult) return null

    return (
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-lg`}>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <ClipboardList className="mr-2 text-green-500" />
          All Holdings ({parseResult.holdings.length})
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <tr>
                <th className="text-left p-3">Symbol</th>
                <th className="text-left p-3">Name</th>
                <th className="text-right p-3">Shares</th>
                <th className="text-right p-3">Price</th>
                <th className="text-right p-3">Value</th>
                <th className="text-right p-3">Gain/Loss</th>
                <th className="text-right p-3">%</th>
              </tr>
            </thead>
            <tbody>
              {parseResult.holdings.map((holding, idx) => (
                <tr key={idx} className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <td className="p-3 font-medium">{holding.symbol}</td>
                  <td className="p-3 text-sm">{holding.name}</td>
                  <td className="p-3 text-right">{holding.shares}</td>
                  <td className="p-3 text-right">${holding.currentPrice.toFixed(2)}</td>
                  <td className="p-3 text-right font-medium">${holding.marketValue.toLocaleString()}</td>
                  <td className={`p-3 text-right ${holding.unrealizedGain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ${holding.unrealizedGain.toLocaleString()}
                  </td>
                  <td className={`p-3 text-right ${holding.unrealizedGain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {holding.unrealizedGainPercent.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} font-bold`}>
              <tr>
                <td colSpan={4} className="p-3">Total</td>
                <td className="p-3 text-right">${totalValue.toLocaleString()}</td>
                <td className="p-3 text-right" colSpan={2}>
                  {parseResult.holdings.reduce((sum, h) => sum + h.unrealizedGain, 0).toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <BarChart3 className="w-8 h-8 text-blue-500 mr-2" />
            <div>
              <h1 className="text-xl font-bold">Portfolio X-Ray Pro™</h1>
              <p className="text-xs text-gray-500">Institutional Analytics Platform</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {parseResult && (
              <div className="text-right">
                <p className="text-xs text-gray-500">Portfolio Value</p>
                <p className="text-lg font-bold text-green-500">${totalValue.toLocaleString()}</p>
              </div>
            )}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {parseResult && (
              <button 
                onClick={() => {setParseResult(null); setCurrentView('dashboard')}}
                className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {currentView === 'dashboard' && (
          <div>
            {/* Upload Section */}
            {!parseResult && (
              <div className={`mb-6 p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <h2 className="text-xl font-bold mb-3">Upload Portfolio CSV</h2>
                <CSVUploader onDataParsed={handleCSVUpload} isDarkMode={isDarkMode} />
              </div>
            )}

            {parseResult && (
              <div className={`mb-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Portfolio Loaded Successfully</h3>
                    <p className="text-sm text-gray-500">
                      {parseResult.holdings.length} holdings from {parseResult.metadata.custodianDetected}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-500">${totalValue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}

            {/* All Dashboard Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
              {dashboardCards.map((card) => {
                const Icon = card.icon
                const isDisabled = !parseResult
                
                return (
                  <div
                    key={card.id}
                    onClick={() => !isDisabled && setCurrentView(card.id as NavigationView)}
                    className={`relative rounded-lg p-4 transition-all ${
                      isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'
                    } ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${
                      isDarkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-5 rounded-lg`} />
                    {card.premium && (
                      <span className="absolute top-2 right-2 text-xs px-1.5 py-0.5 bg-amber-500 text-black rounded font-bold">
                        PRO
                      </span>
                    )}
                    <Icon className="w-6 h-6 mb-2 text-blue-500" />
                    <h3 className="font-semibold text-sm">{card.title}</h3>
                    <p className="text-xs text-gray-500">{card.subtitle}</p>
                  </div>
                )
              })}
            </div>

            {/* Pricing */}
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-500">$297</p>
                  <p className="text-xs text-gray-500">Basic/month</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-500">$597</p>
                  <p className="text-xs text-gray-500">Pro + GIPS</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-500">$997</p>
                  <p className="text-xs text-gray-500">All Features</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Page */}
        {currentView === 'analytics' && parseResult && (
          <div>
            <button onClick={() => setCurrentView('dashboard')} className={`mb-4 px-4 py-2 rounded-full text-sm ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
            } flex items-center gap-2`}>
              <ArrowLeft size={16} /> Dashboard
            </button>
            <div className="space-y-6">
              <PerformanceAnalysis />
              <PerformanceCharts holdings={parseResult.holdings} isDarkMode={isDarkMode} />
            </div>
          </div>
        )}

        {/* Holdings Page */}
        {currentView === 'holdings' && parseResult && (
          <div>
            <button onClick={() => setCurrentView('dashboard')} className={`mb-4 px-4 py-2 rounded-full text-sm ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
            } flex items-center gap-2`}>
              <ArrowLeft size={16} /> Dashboard
            </button>
            <HoldingsTable />
          </div>
        )}

        {/* Risk Page */}
        {currentView === 'risk' && parseResult && (
          <div>
            <button onClick={() => setCurrentView('dashboard')} className={`mb-4 px-4 py-2 rounded-full text-sm ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
            } flex items-center gap-2`}>
              <ArrowLeft size={16} /> Dashboard
            </button>
            <RiskAnalysis holdings={parseResult.holdings} isDarkMode={isDarkMode} />
          </div>
        )}

        {/* Sector Page */}
        {currentView === 'sector' && parseResult && (
          <div>
            <button onClick={() => setCurrentView('dashboard')} className={`mb-4 px-4 py-2 rounded-full text-sm ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
            } flex items-center gap-2`}>
              <ArrowLeft size={16} /> Dashboard
            </button>
            <SectorAnalysis holdings={parseResult.holdings} isDarkMode={isDarkMode} />
          </div>
        )}

        {/* Other Pages */}
        {['gips', 'tax', 'reports', 'xray', 'costbasis', 'settings', 'support'].includes(currentView) && (
          <div>
            <button onClick={() => setCurrentView('dashboard')} className={`mb-4 px-4 py-2 rounded-full text-sm ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
            } flex items-center gap-2`}>
              <ArrowLeft size={16} /> Dashboard
            </button>
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-8 text-center`}>
              <h2 className="text-2xl font-bold mb-4">{currentView.toUpperCase()} Module</h2>
              <p className="text-gray-500">Coming soon...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App