import emailjs from '@emailjs/browser'
import { ArrowUpRight, CheckCircle2, LoaderCircle, Send } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { profile } from '../../data/portfolio'

type SubmitState = 'idle' | 'sending' | 'sent' | 'fallback' | 'error'

const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined,
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = formRef.current
    if (!form) return

    const data = new FormData(form)
    if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
      const subject = encodeURIComponent(String(data.get('subject') || 'Portfolio enquiry'))
      const body = encodeURIComponent(`Hi Mohammed,\n\n${String(data.get('message') || '')}\n\nFrom: ${String(data.get('from_name') || '')} (${String(data.get('reply_to') || '')})`)
      setSubmitState('fallback')
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      return
    }

    try {
      setSubmitState('sending')
      await emailjs.sendForm(emailConfig.serviceId, emailConfig.templateId, form, {
        publicKey: emailConfig.publicKey,
      })
      form.reset()
      setSubmitState('sent')
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="contact-form glass-panel" aria-label="Contact Mohammed Sohail">
      <div className="field-grid">
        <label>
          <span>Name</span>
          <input name="from_name" type="text" autoComplete="name" required placeholder="Your name" />
        </label>
        <label>
          <span>Email</span>
          <input name="reply_to" type="email" autoComplete="email" required placeholder="you@example.com" />
        </label>
      </div>
      <label>
        <span>Subject</span>
        <input name="subject" type="text" required placeholder="Project, role, or collaboration" />
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" rows={6} required placeholder="Tell me a little about what you are building…" />
      </label>
      <button className="button button--primary form-submit" type="submit" disabled={submitState === 'sending'}>
        {submitState === 'sending' ? <LoaderCircle className="spin" size={18} /> : <Send size={18} />}
        {submitState === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      <div className="form-status" aria-live="polite">
        {submitState === 'sent' && <><CheckCircle2 size={17} /> Message sent. I’ll get back to you soon.</>}
        {submitState === 'fallback' && <>Email service is not configured, so your mail app was opened instead.</>}
        {submitState === 'error' && <><span>Delivery failed. Please </span><a href={`mailto:${profile.email}`}>email me directly <ArrowUpRight size={14} /></a>.</>}
      </div>
    </form>
  )
}
