const VolunteerRegistrationPage = () => {
  const [form, setForm] = React.useState({ fullName: '', email: '', mobile: '', city: '', organisation: '', areasOfInterest: '', availability: '', message: '' });
  const [status, setStatus] = React.useState({ type: '', text: '' });
  const [submitting, setSubmitting] = React.useState(false);

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault(); setStatus({ type: '', text: '' }); setSubmitting(true);
    try {
      const response = await fetch('/api/volunteer-register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || 'Unable to submit registration.');
      setStatus({ type: 'success', text: 'Thank you for volunteering! We have received your registration and will be in touch.' });
      setForm({ fullName: '', email: '', mobile: '', city: '', organisation: '', areasOfInterest: '', availability: '', message: '' });
    } catch (error) { setStatus({ type: 'error', text: error.message }); }
    finally { setSubmitting(false); }
  };
  const fields = [
    ['fullName', 'Full name', true, 'text'], ['email', 'Email', true, 'email'], ['mobile', 'Mobile number', true, 'tel'],
    ['city', 'City / Location', true, 'text'], ['organisation', 'Organisation or school', false, 'text'],
    ['areasOfInterest', 'Areas of interest', true, 'text'], ['availability', 'Availability', true, 'text']
  ];
  return <div className="min-h-screen flex flex-col bg-background"><Navigation /><main className="flex-1 pt-[110px] pb-16 px-4 sm:px-6">
    <section className="max-w-2xl mx-auto"><div className="text-center mb-10"><p className="text-primary font-bold uppercase tracking-widest text-sm">Join the movement</p><h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mt-3">Volunteer Registration</h1><p className="text-muted-foreground mt-4">Share your skills and time to help us make STEM learning accessible to every child.</p></div>
      <form onSubmit={submit} className="bg-card rounded-2xl border border-border/60 shadow-lg p-6 sm:p-8 space-y-5" noValidate>
        {fields.map(([name, label, required, type]) => <div key={name}><label htmlFor={name} className="block text-sm font-semibold text-foreground mb-2">{label}{required && <span className="text-primary ml-1" aria-hidden="true">*</span>}</label><input id={name} name={name} type={type} value={form[name]} onChange={update} required={required} className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary focus:border-primary" /></div>)}
        <div><label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">How would you like to help?</label><textarea id="message" name="message" value={form.message} onChange={update} rows="4" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary focus:border-primary" /></div>
        {status.text && <div role="alert" className={`rounded-lg px-4 py-3 text-sm ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{status.text}</div>}
        <button type="submit" disabled={submitting} className="w-full rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60">{submitting ? 'Submitting…' : 'Submit registration'}</button>
      </form></section></main><Footer /></div>;
};
window.VolunteerRegistrationPage = VolunteerRegistrationPage;
