import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert'
import { useAnalysisStore } from '@/store/analysisStore'
import { analysisService } from '@/services/analysisService'
import { Upload, AlertCircle, Loader2, Check, Info } from 'lucide-react'

export default function AnalysisPage() {
  const navigate = useNavigate()
  const { addResult, setLoading, setError, isLoading, error } = useAnalysisStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB')
      return
    }

    setSelectedFile(file)
    setError(null)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await analysisService.uploadImage(selectedFile)
      addResult(result)

      // Redirect to results page
      setTimeout(() => {
        navigate(`/analysis/${result.id}`)
      }, 500)
    } catch (err: any) {
      setError(err.message || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Skin Analysis</h1>
            <p className="text-lg text-muted-foreground">Upload an image for medical-grade AI analysis</p>
          </div>

          {/* Upload Card */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>
                Upload a clear image for medical-grade analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive" className="bg-destructive/10 border-destructive/20">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Upload Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border/60 rounded-xl p-12 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer bg-secondary/30"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={isLoading}
                />

                {preview ? (
                  <div className="space-y-4">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-40 h-40 object-cover rounded-lg mx-auto border-2 border-border/50"
                    />
                    <p className="text-sm text-muted-foreground font-medium">
                      {selectedFile?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile?.size || 0 / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Upload className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        PNG, JPG or GIF (max 10MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Guidelines */}
              <Card className="bg-secondary/50 border-border/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    For best results:
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      Ensure good lighting and contrast
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      Take a clear, high-resolution photo
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      Avoid shadows, glare, and reflections
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      Include the affected area prominently
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-2">
                <Button
                  onClick={handleUpload}
                  disabled={!selectedFile || isLoading}
                  className="flex-1 h-11 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/20"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Image'
                  )}
                </Button>

                {preview && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPreview(null)
                      setSelectedFile(null)
                      if (fileInputRef.current) {
                        fileInputRef.current.value = ''
                      }
                    }}
                    disabled={isLoading}
                    className="h-11"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="bg-accent/5 border-accent/20">
            <CardHeader>
              <CardTitle className="text-base">About Dermascan AI</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Dermascan AI utilizes advanced deep learning models trained on thousands of medical-grade skin images to provide accurate AI-assisted analysis. Our system achieves clinical-grade accuracy for common skin conditions.
              </p>
              <p className="text-xs">
                <strong>Medical Disclaimer:</strong> Results are for informational and educational purposes only. They should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a licensed healthcare professional for proper diagnosis and treatment options.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
