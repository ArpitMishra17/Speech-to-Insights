import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export default function AudioUpload() {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const result = await axios.post(
        'http://localhost:8000/transcribe/', // Backend URL
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setTranscription(result.data.transcription);
      setResponse(result.data.response);
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Audio to LLM Response</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept="audio/*"
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Upload Audio'}
        </Button>
      </form>

      {transcription && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Transcription</h2>
          <p className="whitespace-pre-wrap">{transcription}</p>
        </div>
      )}

      {response && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">LLM Response</h2>
          <p className="whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
}