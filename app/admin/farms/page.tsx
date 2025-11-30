'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit2, Trash2, TrendingUp, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface Farm {
  id: string
  name: string
  category: string
  description?: string | null
  location?: string | null
  owner?: string | null
  roi: number
  durationMonths: number
  targetFunding: number
  collectedAmount: number
  riskLevel?: string | null
  status: string
  imageUrl?: string | null
}

export default function FarmManagementPage() {
  const { toast } = useToast()
  const [farms, setFarms] = useState<Farm[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddFarm, setShowAddFarm] = useState(false)
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null)
  const [deletingFarmId, setDeletingFarmId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    category: 'Crops',
    description: '',
    location: '',
    owner: '',
    roi: '',
    durationMonths: '',
    targetFunding: '',
    riskLevel: 'Low',
    imageUrl: '',
  })

  useEffect(() => {
    fetchFarms()
  }, [])

  const fetchFarms = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/farms')
      if (!res.ok) throw new Error('Failed to fetch farms')
      const data = await res.json()
      setFarms(data)
    } catch (error) {
      console.error('Error fetching farms:', error)
      toast({
        title: 'Error',
        description: 'Failed to load farms. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Crops',
      description: '',
      location: '',
      owner: '',
      roi: '',
      durationMonths: '',
      targetFunding: '',
      riskLevel: 'Low',
      imageUrl: '',
    })
    setEditingFarm(null)
    setShowAddFarm(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const farmPayload = {
        name: formData.name,
        category: formData.category,
        description: formData.description || undefined,
        location: formData.location || undefined,
        owner: formData.owner || undefined,
        roi: parseFloat(formData.roi),
        durationMonths: parseInt(formData.durationMonths),
        targetFunding: parseFloat(formData.targetFunding),
        riskLevel: formData.riskLevel || undefined,
        imageUrl: formData.imageUrl || undefined,
      }

      const url = editingFarm ? `/api/farms/${editingFarm.id}` : '/api/farms'
      const method = editingFarm ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(farmPayload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save farm')
      }

      toast({
        title: 'Success',
        description: editingFarm ? 'Farm updated successfully!' : 'Farm created successfully!',
      })

      resetForm()
      fetchFarms()
    } catch (error) {
      console.error('Error saving farm:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save farm',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (farm: Farm) => {
    setEditingFarm(farm)
    setFormData({
      name: farm.name,
      category: farm.category,
      description: farm.description || '',
      location: farm.location || '',
      owner: farm.owner || '',
      roi: farm.roi.toString(),
      durationMonths: farm.durationMonths.toString(),
      targetFunding: farm.targetFunding.toString(),
      riskLevel: farm.riskLevel || 'Low',
      imageUrl: farm.imageUrl || '',
    })
    setShowAddFarm(true)
  }

  const handleDelete = async () => {
    if (!deletingFarmId) return

    try {
      const res = await fetch(`/api/farms/${deletingFarmId}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to delete farm')
      }

      toast({
        title: 'Success',
        description: 'Farm deleted successfully!',
      })

      setDeletingFarmId(null)
      fetchFarms()
    } catch (error) {
      console.error('Error deleting farm:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete farm',
        variant: 'destructive',
      })
    }
  }

  const filteredFarms = farms.filter(farm =>
    farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (farm.owner && farm.owner.toLowerCase().includes(searchTerm.toLowerCase()))
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
            <Button onClick={() => {
              resetForm()
              setShowAddFarm(!showAddFarm)
            }} className="bg-primary hover:bg-primary/90 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Farm
            </Button>
          </div>

          {showAddFarm && (
            <Card>
              <CardHeader>
                <CardTitle>{editingFarm ? 'Edit Farm' : 'Add New Farm'}</CardTitle>
                <CardDescription>
                  {editingFarm ? 'Update farm information' : 'Create a new investment opportunity'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Farm Name *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter farm name"
                        className="bg-input text-foreground"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground"
                        required
                      >
                        <option value="Crops">Crops</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Livestock">Livestock</option>
                        <option value="Fisheries">Fisheries</option>
                        <option value="Agroforestry">Agroforestry</option>
                        <option value="Greenhouse">Greenhouse</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Target Funding ($) *</label>
                      <Input
                        name="targetFunding"
                        type="number"
                        value={formData.targetFunding}
                        onChange={handleInputChange}
                        placeholder="100000"
                        className="bg-input text-foreground"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Expected ROI (%) *</label>
                      <Input
                        name="roi"
                        type="number"
                        value={formData.roi}
                        onChange={handleInputChange}
                        placeholder="18.5"
                        step="0.1"
                        className="bg-input text-foreground"
                        required
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Duration (months) *</label>
                      <Input
                        name="durationMonths"
                        type="number"
                        value={formData.durationMonths}
                        onChange={handleInputChange}
                        placeholder="12"
                        className="bg-input text-foreground"
                        required
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Risk Level</label>
                      <select
                        name="riskLevel"
                        value={formData.riskLevel}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Owner</label>
                      <Input
                        name="owner"
                        value={formData.owner}
                        onChange={handleInputChange}
                        placeholder="Owner name"
                        className="bg-input text-foreground"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Location</label>
                      <Input
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Farm location"
                        className="bg-input text-foreground"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Image URL</label>
                      <Input
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                        className="bg-input text-foreground"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Farm details..."
                      rows={4}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={submitting}>
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {editingFarm ? 'Updating...' : 'Creating...'}
                        </>
                      ) : (
                        editingFarm ? 'Update Farm' : 'Create Farm'
                      )}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm} disabled={submitting}>
                      Cancel
                    </Button>
                  </div>
                </form>
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

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredFarms.map((farm) => {
                const progressPercent = (farm.collectedAmount / farm.targetFunding) * 100
                return (
                  <Card key={farm.id}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-lg text-foreground">{farm.name}</h3>
                              {farm.owner && (
                                <p className="text-sm text-muted-foreground">{farm.owner}</p>
                              )}
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
                              <p className="font-semibold text-foreground">{farm.durationMonths} months</p>
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
                              <span>${farm.collectedAmount.toLocaleString()} / ${farm.targetFunding.toLocaleString()}</span>
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
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                            onClick={() => handleEdit(farm)}
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1 text-destructive hover:text-destructive"
                            onClick={() => setDeletingFarmId(farm.id)}
                          >
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
          )}

          {!loading && filteredFarms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {searchTerm ? 'No farms found matching your search' : 'No farms yet. Create your first farm!'}
              </p>
            </div>
          )}
        </div>
      </main>

      <AlertDialog open={!!deletingFarmId} onOpenChange={(open: boolean) => !open && setDeletingFarmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the farm and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
