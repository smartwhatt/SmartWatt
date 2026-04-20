// Work, Experience, Education, Contact editors.

// Small helper to update an item in an array field
function updateArrayItem(update, key, i, patch) {
  update(c => ({
    ...c,
    [key]: (c[key] || []).map((it, j) => j === i ? { ...it, ...patch } : it),
  }));
}
function removeArrayItem(update, key, i) {
  update(c => ({ ...c, [key]: (c[key] || []).filter((_, j) => j !== i) }));
}
function moveArrayItem(update, key, from, to) {
  update(c => ({ ...c, [key]: moveItem(c[key] || [], from, to) }));
}
function addArrayItem(update, key, item) {
  update(c => ({ ...c, [key]: [...(c[key] || []), item] }));
}

function WorkSection({ content, update }) {
  const items = Array.isArray(content.work) ? content.work : [];
  return (
    <SectionCard title="Selected Work" subtitle="Projects, publications, and ships worth listing" count={items.length}>
      {items.map((row, i) => (
        <ItemRow key={i} index={i} total={items.length}
          title={row.title} meta={[row.venue, row.year, row.kind].filter(Boolean).join(' · ')}
          onMoveUp={() => moveArrayItem(update, 'work', i, i - 1)}
          onMoveDown={() => moveArrayItem(update, 'work', i, i + 1)}
          onRemove={() => removeArrayItem(update, 'work', i)}>
          <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr 140px', gap: 12 }}>
            <Field label="ID" hint="3-digit"><Input value={row.id || ''} onChange={e => updateArrayItem(update, 'work', i, { id: e.target.value })} /></Field>
            <Field label="Title" required><Input value={row.title || ''} onChange={e => updateArrayItem(update, 'work', i, { title: e.target.value })} /></Field>
            <Field label="Venue / role"><Input value={row.venue || ''} onChange={e => updateArrayItem(update, 'work', i, { venue: e.target.value })} /></Field>
            <Field label="Year"><Input value={row.year || ''} onChange={e => updateArrayItem(update, 'work', i, { year: e.target.value })} /></Field>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 12 }}>
            <Field label="Kind">
              <Select value={row.kind || 'engineering'} onChange={e => updateArrayItem(update, 'work', i, { kind: e.target.value })}
                options={[{ value: 'research', label: 'Research' }, { value: 'engineering', label: 'Engineering' }]} />
            </Field>
            <Field label="Link" hint="optional"><Input value={row.link || ''} placeholder="https://…"
              onChange={e => updateArrayItem(update, 'work', i, { link: e.target.value })} /></Field>
          </div>
          <Field label="Thumbnail" hint="URL or upload a small image (shown 36×36 next to title)">
            <ThumbnailInput value={row.thumbnail || ''} onChange={v => updateArrayItem(update, 'work', i, { thumbnail: v })} />
          </Field>
        </ItemRow>
      ))}
      <Btn variant="default" onClick={() => addArrayItem(update, 'work', {
        id: String(items.length + 1).padStart(3, '0'), title: '', venue: '', year: new Date().getFullYear().toString(),
        kind: 'engineering', link: '', thumbnail: '',
      })} style={{ marginTop: 8 }}>+ Add work entry</Btn>
    </SectionCard>
  );
}

function ThumbnailInput({ value, onChange }) {
  const fileRef = React.useRef(null);
  const onFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (f.size > 500 * 1024) {
      alert('Image too large (>500KB). Use a URL or compress it first.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(f);
  };
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      {value ? (
        <div style={{ position: 'relative' }}>
          <img src={value} alt="" style={{
            width: 48, height: 48, objectFit: 'cover', borderRadius: 3,
            border: `1px solid ${t().rule}`,
          }} onError={e => e.currentTarget.style.opacity = 0.3} />
          <button onClick={() => onChange('')} title="Remove" style={{
            position: 'absolute', top: -6, right: -6, width: 18, height: 18, borderRadius: '50%',
            background: '#c44', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 11,
            lineHeight: '18px', padding: 0,
          }}>×</button>
        </div>
      ) : (
        <div style={{
          width: 48, height: 48, borderRadius: 3, border: `1px dashed ${t().rule}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: t().mutedSoft, fontSize: 18,
        }}>◻</div>
      )}
      <div style={{ flex: 1 }}>
        <Input value={value && value.startsWith('data:') ? '(uploaded image)' : (value || '')}
          readOnly={value && value.startsWith('data:')}
          placeholder="https://… or upload"
          onChange={e => onChange(e.target.value)} />
        <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
          <Btn variant="ghost" onClick={() => fileRef.current && fileRef.current.click()}>Upload</Btn>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onFile} />
        </div>
      </div>
    </div>
  );
}

function ExperienceSection({ content, update }) {
  const items = Array.isArray(content.experience) ? content.experience : [];
  return (
    <SectionCard title="Experience & Research" subtitle="Jobs, research roles, and publications" count={items.length}>
      {items.map((row, i) => (
        <ItemRow key={i} index={i} total={items.length}
          title={row.role} meta={[row.period, row.org].filter(Boolean).join(' · ')}
          onMoveUp={() => moveArrayItem(update, 'experience', i, i - 1)}
          onMoveDown={() => moveArrayItem(update, 'experience', i, i + 1)}
          onRemove={() => removeArrayItem(update, 'experience', i)}>
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 12 }}>
            <Field label="Period" hint="e.g. 2025 — Now"><Input value={row.period || ''} onChange={e => updateArrayItem(update, 'experience', i, { period: e.target.value })} /></Field>
            <Field label="Role / title" required><Input value={row.role || ''} onChange={e => updateArrayItem(update, 'experience', i, { role: e.target.value })} /></Field>
          </div>
          <Field label="Organization / context"><Input value={row.org || ''} onChange={e => updateArrayItem(update, 'experience', i, { org: e.target.value })} /></Field>
          <Field label="Description"><Textarea rows={3} value={row.description || ''} onChange={e => updateArrayItem(update, 'experience', i, { description: e.target.value })} /></Field>
        </ItemRow>
      ))}
      <Btn variant="default" onClick={() => addArrayItem(update, 'experience', {
        period: '', role: '', org: '', description: '',
      })} style={{ marginTop: 8 }}>+ Add experience</Btn>
    </SectionCard>
  );
}

function EducationSection({ content, update }) {
  const items = Array.isArray(content.education) ? content.education : [];
  return (
    <SectionCard title="Education" subtitle="Schools, in chronological order (newest first)" count={items.length}>
      {items.map((row, i) => (
        <ItemRow key={i} index={i} total={items.length}
          title={row.school} meta={[row.year, row.description].filter(Boolean).join(' · ')}
          onMoveUp={() => moveArrayItem(update, 'education', i, i - 1)}
          onMoveDown={() => moveArrayItem(update, 'education', i, i + 1)}
          onRemove={() => removeArrayItem(update, 'education', i)}>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 12 }}>
            <Field label="Year"><Input value={row.year || ''} onChange={e => updateArrayItem(update, 'education', i, { year: e.target.value })} /></Field>
            <Field label="School" required><Input value={row.school || ''} onChange={e => updateArrayItem(update, 'education', i, { school: e.target.value })} /></Field>
          </div>
          <Field label="Description"><Textarea rows={2} value={row.description || ''} onChange={e => updateArrayItem(update, 'education', i, { description: e.target.value })} /></Field>
        </ItemRow>
      ))}
      <Btn variant="default" onClick={() => addArrayItem(update, 'education', {
        year: '', school: '', description: '',
      })} style={{ marginTop: 8 }}>+ Add school</Btn>
    </SectionCard>
  );
}

function ContactSection({ content, update }) {
  const contact = content.contact || {};
  const methods = Array.isArray(contact.methods) ? contact.methods : [];
  return (
    <SectionCard title="Contact" subtitle="How people reach you" count={methods.length}>
      <Field label="Intro paragraph" hint="shown next to the form">
        <Textarea rows={2} value={contact.intro || ''}
          onChange={e => update(c => ({ ...c, contact: { ...c.contact, intro: e.target.value } }))} />
      </Field>
      <div style={{ height: 1, background: t().rule, margin: '16px 0 20px' }} />
      <div style={{
        fontFamily: MONO, fontSize: 10, color: t().muted,
        letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10,
      }}>Methods</div>
      {methods.map((row, i) => (
        <ItemRow key={i} index={i} total={methods.length}
          title={row.label} meta={row.value}
          onMoveUp={() => update(c => ({ ...c, contact: { ...c.contact, methods: moveItem(methods, i, i - 1) } }))}
          onMoveDown={() => update(c => ({ ...c, contact: { ...c.contact, methods: moveItem(methods, i, i + 1) } }))}
          onRemove={() => update(c => ({ ...c, contact: { ...c.contact, methods: methods.filter((_, j) => j !== i) } }))}>
          <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr', gap: 12 }}>
            <Field label="Label" hint="Email, LinkedIn…">
              <Input value={row.label || ''} onChange={e => update(c => ({
                ...c, contact: { ...c.contact, methods: methods.map((m, j) => j === i ? { ...m, label: e.target.value } : m) }
              }))} />
            </Field>
            <Field label="Display text">
              <Input value={row.value || ''} onChange={e => update(c => ({
                ...c, contact: { ...c.contact, methods: methods.map((m, j) => j === i ? { ...m, value: e.target.value } : m) }
              }))} />
            </Field>
            <Field label="Link (href)" hint="leave blank for plain text">
              <Input value={row.href || ''} placeholder="mailto:… or https://…" onChange={e => update(c => ({
                ...c, contact: { ...c.contact, methods: methods.map((m, j) => j === i ? { ...m, href: e.target.value } : m) }
              }))} />
            </Field>
          </div>
        </ItemRow>
      ))}
      <Btn variant="default" onClick={() => update(c => ({
        ...c, contact: { ...c.contact, methods: [...methods, { label: '', value: '', href: '' }] }
      }))} style={{ marginTop: 8 }}>+ Add method</Btn>
    </SectionCard>
  );
}

window.WorkSection = WorkSection;
window.ExperienceSection = ExperienceSection;
window.EducationSection = EducationSection;
window.ContactSection = ContactSection;
