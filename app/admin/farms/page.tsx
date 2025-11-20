'use client'

import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit2, Trash2, TrendingUp } from 'lucide-react'
import { useState } from 'react'

const farms = [
  {
    id: 1,
    name: 'Green Valley Rice Farm',
    category: 'Crops',
    roi: 18.5,
    duration: '12 months',
    targetFunding: 100000,
    collected: 75000,
    status: 'active',
    owner: 'Ahmed Co.',
  },
  {
    id: 2,
    name: 'Mango Orchards Bangladesh',
    category: 'Fruits',
    roi: 22.0,
    duration: '18 months',
    targetFunding: 80000,
    collected: 55000,
    status: 'active',
    owner: 'Mango Farms Ltd',
  },
  {
    id: 3,
    name: 'Aquaculture Fisheries',
    category: 'Fisheries',
    roi: 20.5,
    duration: '10 months',
    targetFunding: 120000,
    collected: 92000,
    status: 'active',
    owner: 'Fish Corp',
  },
]

export default function FarmManagementPage() {
  const [activeTab, setActiveTab] = useState('home')
  const [showAddFarm, setShowAddFarm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFarms = farms.filter(farm =>
    farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farm.owner.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-background">
     
      
      <main className="flex-1 overflow-auto p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
         
          <div className="flex justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Farm Management</h1>
              <p className="text-muted-foreground">Manage all agricultural investment projects</p>
            </div>
            <Button onClick={() => setShowAddFarm(!showAddFarm)} className="bg-primary hover:bg-primary/90 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Farm
            </Button>
          </div>

        
          {showAddFarm && (
            <Card>
              <CardHeader>
                <CardTitle>Add New Farm</CardTitle>
                <CardDescription>Create a new investment opportunity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Farm Name</label>
                    <Input placeholder="Enter farm name" className="bg-input text-foreground" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Category</label>
                    <select className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground">
                      <option>Crops</option>
                      <option>Fruits</option>
                      <option>Livestock</option>
                      <option>Fisheries</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Target Funding ($)</label>
                    <Input type="number" placeholder="100000" className="bg-input text-foreground" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Expected ROI (%)</label>
                    <Input type="number" placeholder="18.5" step="0.1" className="bg-input text-foreground" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Duration (months)</label>
                    <Input type="number" placeholder="12" className="bg-input text-foreground" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Risk Level</label>
                    <select className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Description</label>
                  <textarea
                    placeholder="Farm details..."
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex gap-2">
                  <Button className="bg-primary hover:bg-primary/90">Create Farm</Button>
                  <Button variant="outline" onClick={() => setShowAddFarm(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

         
          <div>
            <Input
              placeholder="Search farms by name or owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-input text-foreground placeholder:text-muted-foreground max-w-md"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredFarms.map((farm) => {
              const progressPercent = (farm.collected / farm.targetFunding) * 100
              return (
                <Card key={farm.id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-lg text-foreground">{farm.name}</h3>
                            <p className="text-sm text-muted-foreground">{farm.owner}</p>
                          </div>
                          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                            {farm.category}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4 text-sm">
                          <div>
                            <p className="text-muted-foreground text-xs mb-1">ROI</p>
                            <p className="font-bold text-primary flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              {farm.roi}%
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs mb-1">Duration</p>
                            <p className="font-semibold text-foreground">{farm.duration}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs mb-1">Status</p>
                            <p className="font-semibold text-green-600">{farm.status}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs mb-1">Progress</p>
                            <p className="font-semibold text-foreground">{Math.round(progressPercent)}%</p>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Funding Progress</span>
                            <span>${farm.collected.toLocaleString()} / ${farm.targetFunding.toLocaleString()}</span>
                          </div>
                          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${Math.min(progressPercent, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
