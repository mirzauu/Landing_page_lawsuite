"use client"
import React, { useState } from "react"
import { Button } from "@/components/Button"

export default function EmailSenderPage() {
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    recipientName: "",
    toEmail: "",
    subject: "",
    body: ""
  })
  const [status, setStatus] = useState<{type: 'success'|'error', msg: string} | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const addLink = () => {
    const textarea = document.getElementsByName("body")[0] as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = formData.body.substring(start, end)

    if (!selectedText) {
      alert("Please select some text in the body first to turn it into a link.")
      return
    }

    const url = window.prompt("Enter the URL for the link:", "https://")
    if (url) {
      const newBody = 
        formData.body.substring(0, start) + 
        `<a href="${url}" style="color: #f97316; text-decoration: underline;">${selectedText}</a>` + 
        formData.body.substring(end)
      
      setFormData({ ...formData, body: newBody })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      
      if (res.ok && data.success) {
        setStatus({ type: "success", msg: "Email sent successfully!" })
        setFormData({ recipientName: "", toEmail: "", subject: "", body: "" })
        setShowForm(false)
      } else {
        setStatus({ type: "error", msg: data.error || "Failed to send email." })
      }
    } catch (err) {
      setStatus({ type: "error", msg: "An unexpected error occurred." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-32">
      <div className="mx-auto max-w-2xl bg-white rounded-xl shadow-sm p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Email Sender</h1>
        
        {status && (
          <div className={`p-4 mb-6 rounded-md ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {status.msg}
          </div>
        )}

        {!showForm ? (
          <Button onClick={() => setShowForm(true)} className="w-full sm:w-auto">
            New Email
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Recipient Name</label>
                <input 
                  required
                  type="text" 
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Recipient Email</label>
                <input 
                  required
                  type="email" 
                  name="toEmail"
                  value={formData.toEmail}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Subject</label>
              <input 
                required
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                placeholder="Hello from VerbaLex AI"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Body</label>
                <button 
                  type="button"
                  onClick={addLink}
                  className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 bg-orange-50 px-2 py-1 rounded border border-orange-100 transition-colors"
                >
                  🔗 Add Link
                </button>
              </div>
              <textarea 
                required
                name="body"
                value={formData.body}
                onChange={handleChange}
                rows={10}
                className="w-full p-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors font-mono text-sm"
                placeholder="Type your message here... Select text and click 'Add Link' to insert a hyperlink."
              />
              <p className="text-[10px] text-gray-400">Note: Links will appear as HTML code here but will be clickable in the email.</p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Email"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
