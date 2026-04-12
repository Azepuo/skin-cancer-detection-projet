import React, { useState, useRef } from 'react';
import axios from 'axios';
import { 
  Upload, 
  ImageIcon, 
  RefreshCw, 
  Info, 
  AlertCircle, 
  ShieldCheck, 
  Brain, 
  Target, 
  Activity,
  ArrowRight,
  ChevronRight,
  Database,
  Search
} from 'lucide-react';

const API_URL = 'http://localhost:8000';

const HomeView = ({ onStart }) => (
  <div className="home-section">
    <section className="hero">
      <h2>Early Detection <br/><span style={{ color: 'var(--accent-cyan)' }}>Saves Lives.</span></h2>
      <p>
        Dermascan AI uses state-of-the-art Deep Learning to analyze skin lesions with professional-grade precision. 
        Empowering early detection through accessible artificial intelligence.
      </p>
      <button className="btn btn-primary btn-large" onClick={onStart}>
        Launch Analyzer <ArrowRight size={20} />
      </button>
    </section>

    <div className="feature-grid">
      <div className="feature-card">
        <Brain className="feature-icon" />
        <h3>Neural Network</h3>
        <p>Utilizes a multi-layer Convolutional Neural Network (CNN) architecture optimized for dermatological feature extraction and pattern recognition.</p>
      </div>
      <div className="feature-card">
        <Database className="feature-icon" />
        <h3>Data-Driven</h3>
        <p>Trained on the HAM10000 dataset, a comprehensive collection of multi-source dermatoscopic images of common pigmented skin lesions.</p>
      </div>
      <div className="feature-card">
        <Target className="feature-icon" />
        <h3>7 Class detection</h3>
        <p>Accurately classifies across 7 distinct categories including Melanoma, Basal Cell Carcinoma, and various benign conditions.</p>
      </div>
    </div>

    <section className="info-section" style={{ marginTop: '2rem' }}>
      <div className="info-card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={20} /> The Mission
        </h3>
        <p>Our goal is to bridge the gap between AI research and practical health awareness, providing a secondary tool for skin monitoring that helps users decide when to seek professional consultation.</p>
      </div>
      <div className="info-card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Search size={20} /> How it Works
        </h3>
        <p>When you upload a photo, our system performs center-cropping, ultra-high-quality scaling, and color standardization before passing it through the trained AI model to calculate probability scores.</p>
      </div>
    </section>
  </div>
);

const AnalyzerView = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setPrediction(null);
    setError(null);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(`${API_URL}/predict`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPrediction(response.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail || 'An error occurred while analyzing the image. Please ensure the backend is running.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setPreview(null);
    setPrediction(null);
    setError(null);
  };

  if (prediction) {
    return (
      <main className="glass-card results-container">
        <div className="main-prediction">
          <ShieldCheck size={48} color="var(--accent-cyan)" style={{ marginBottom: '1rem' }} />
          <div className="confidence-badge">
            {(prediction.confidence * 100).toFixed(1)}% Confidence
          </div>
          <h2 className="prediction-label">{prediction.prediction}</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0.5rem auto' }}>
            Our AI analysis suggests this lesion is: <strong>{prediction.prediction}</strong>.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontStyle: 'italic' }}>
            {prediction.description}
          </p>
        </div>

        <div className="scores-list">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Detailed Probability Breakdown</h3>
          {prediction.all_scores.map((score, idx) => (
            <div key={idx} className="score-item">
              <div className="score-info">
                <span>{score.label}</span>
                <span>{(score.confidence * 100).toFixed(1)}%</span>
              </div>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${score.confidence * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', opacity: 0.7 }}>
            * AI-assisted tool. Consult a professional dermatologist for diagnosis.
          </p>
          <button className="btn btn-primary" onClick={reset}>
            <RefreshCw size={18} /> Analyze Another Image
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="analyzer-view">
      {!preview ? (
        <div
          className={`glass-card upload-zone ${isDragging ? 'dragging' : ''}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            style={{ display: 'none' }}
            accept="image/*"
          />
          <Upload className="upload-icon" />
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Drop lesion image here</h2>
            <p>or click to browse local files</p>
          </div>
          <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Supports JPG, PNG (Max 5MB)</p>
        </div>
      ) : (
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <img src={preview} alt="Preview" className="image-preview" />
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={reset}>
              Change
            </button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Analyzing...' : 'Run Prediction'}
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <div className="spinner"></div>
          <p style={{ color: 'var(--text-secondary)' }}>Neural Network inference in progress...</p>
        </div>
      )}

      {error && (
        <div className="glass-card" style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', display: 'flex', gap: '0.75rem', color: '#fca5a5' }}>
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

function App() {
  const [activeView, setActiveView] = useState('home');

  return (
    <div className="app-container">
      <nav className="navbar">
        <h1 onClick={() => setActiveView('home')} style={{ cursor: 'pointer', margin: 0, fontSize: '1.8rem' }}>
          Dermascan <span style={{ color: 'var(--accent-cyan)' }}>AI</span>
        </h1>
        <div className="nav-links">
          <span 
            className={`nav-link ${activeView === 'home' ? 'active' : ''}`} 
            onClick={() => setActiveView('home')}
          >
            Home
          </span>
          <span 
            className={`nav-link ${activeView === 'detector' ? 'active' : ''}`} 
            onClick={() => setActiveView('detector')}
          >
            Detector
          </span>
        </div>
      </nav>

      {activeView === 'home' ? (
        <HomeView onStart={() => setActiveView('detector')} />
      ) : (
        <AnalyzerView />
      )}

      <footer style={{ marginTop: '4rem', color: 'var(--text-secondary)', fontSize: '0.8rem', textAlign: 'center' }}>
        &copy; 2026 Dermascan AI Project. Powered by Deep Learning.
      </footer>
    </div>
  );
}

export default App;
