import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ShieldCheck, LayoutDashboard, Code2, Network, ListChecks, FileSearch, Siren, BrainCircuit, Globe, Settings, Search, Bell, Menu, X, ChevronRight, Plus, CheckCircle2, AlertTriangle, Clock3, LockKeyhole, Activity, BookOpen, Download, RotateCcw } from 'lucide-react';
import './styles.css';

const sections = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'codelab', label: 'Code Lab', icon: Code2 },
  { id: 'training', label: 'Training Lab', icon: BookOpen },
  { id: 'assessments', label: 'Authorized Assessments', icon: Network },
  { id: 'blocking', label: 'Website & App Blocking', icon: Globe },
  { id: 'logs', label: 'Log Analysis', icon: FileSearch },
  { id: 'incidents', label: 'Incident Response', icon: Siren },
  { id: 'intel', label: 'AI & Threat Intelligence', icon: BrainCircuit },
  { id: 'compliance', label: 'Compliance & Risk', icon: ListChecks },
  { id: 'settings', label: 'Setup & Release', icon: Settings }
];

const initialRules = [
  { id: 1, domain: 'example-social.test', reason: 'Training example', status: 'Simulation only', scope: 'Training device' },
  { id: 2, domain: 'malware-demo.test', reason: 'Safe demonstration domain', status: 'Simulation only', scope: 'Training device' }
];

function App() {
  const [active, setActive] = useState('overview');
  const [mobileNav, setMobileNav] = useState(false);
  const [query, setQuery] = useState('');
  const [rules, setRules] = useState(initialRules);
  const [domain, setDomain] = useState('');
  const [reason, setReason] = useState('');
  const [notice, setNotice] = useState('');
  const [assessmentName, setAssessmentName] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [assessments, setAssessments] = useState([]);
  const [trainingDone, setTrainingDone] = useState([]);
  const [logs, setLogs] = useState('2026-10-17T09:30:00Z INFO login success user=analyst\n2026-10-17T09:31:12Z WARN repeated failed login count=4 source=192.0.2.10\n2026-10-17T09:33:02Z INFO policy review completed');
  const [logSummary, setLogSummary] = useState(null);

  const filteredRules = useMemo(() => rules.filter(r => (r.domain + ' ' + r.reason + ' ' + r.scope).toLowerCase().includes(query.toLowerCase())), [rules, query]);
  const title = sections.find(s => s.id === active)?.label || 'Overview';

  function addRule(e) {
    e.preventDefault();
    const clean = domain.trim().toLowerCase();
    if (!clean || !/^[a-z0-9.-]+$/.test(clean) || !clean.includes('.')) {
      setNotice('Enter a valid domain such as example.com. This prototype stores a rule; it does not enforce network blocking.');
      return;
    }
    setRules(prev => [{ id: Date.now(), domain: clean, reason: reason.trim() || 'No reason supplied', status: 'Simulation only', scope: 'This browser prototype' }, ...prev]);
    setDomain(''); setReason('');
    setNotice('Rule saved in this session as a simulation. No website or app has been blocked on your device.');
  }

  function createAssessment(e) {
    e.preventDefault();
    if (!assessmentName.trim() || !authorized) {
      setNotice('Add an assessment name and confirm that written authorization and scope exist before recording the assessment.');
      return;
    }
    setAssessments(prev => [{ id: Date.now(), name: assessmentName.trim(), status: 'Scope recorded — no scan run', date: new Date().toLocaleDateString() }, ...prev]);
    setAssessmentName('');
    setAuthorized(false);
    setNotice('Assessment record created. No network scan was run.');
  }

  function analyzeLogs() {
    const lines = logs.split('\n').filter(Boolean);
    const warnings = lines.filter(line => /warn|error|failed|denied|critical/i.test(line));
    setLogSummary({ count: lines.length, warnings: warnings.length, items: warnings });
  }

  function exportReport() {
    const report = { app: 'CYBERRECOVER AI', mode: 'Prototype / local browser state', generatedAt: new Date().toISOString(), websiteRules: rules, assessmentRecords: assessments, trainingCompleted: trainingDone, note: 'No real blocking, scanning, AI provider, or server-side security integration is active in this prototype.' };
    const url = URL.createObjectURL(new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' }));
    const a = document.createElement('a'); a.href = url; a.download = 'cyberrecover-report.json'; a.click(); URL.revokeObjectURL(url);
  }

  const cards = [
    { title: 'Code Lab', desc: 'Review defensive code and learn safe scripting.', icon: Code2, status: 'Learning workspace' },
    { title: 'Authorized assessments', desc: 'Record written permission, scope and findings.', icon: Network, status: 'No live scanner configured' },
    { title: 'Website & app blocking', desc: 'Manage simulated block rules and setup requirements.', icon: Globe, status: 'Simulation only' },
    { title: 'Incident response', desc: 'Organize events, evidence and remediation tasks.', icon: Siren, status: 'Workspace prototype' }
  ];

  return <div className="app-shell">
    <aside className={'sidebar ' + (mobileNav ? 'open' : '')}>
      <div className="brand"><div className="brand-mark"><ShieldCheck size={23}/></div><div><strong>CYBERRECOVER</strong><span>AI SECURITY WORKSPACE</span></div><button className="close-nav" onClick={() => setMobileNav(false)} aria-label="Close menu"><X size={19}/></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav>{sections.map(item => { const Icon = item.icon; return <button key={item.id} className={'nav-item ' + (active === item.id ? 'active' : '')} onClick={() => { setActive(item.id); setMobileNav(false); setNotice(''); }}><Icon size={18}/><span>{item.label}</span>{item.id === 'overview' && <span className="nav-dot"/>}</button>; })}</nav>
      <div className="sidebar-bottom"><div className="mode-pill"><span className="pulse"/> Prototype mode</div><p>Defensive use only. Assess systems you own or have written permission to test.</p></div>
    </aside>
    {mobileNav && <button className="scrim" onClick={() => setMobileNav(false)} aria-label="Close navigation"/>}
    <main className="main">
      <header className="topbar"><button className="mobile-menu icon-button" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={21}/></button><div className="crumb">Workspace <ChevronRight size={14}/> <b>{title}</b></div><div className="top-actions"><span className="environment"><span/> Local prototype</span><button className="icon-button" title="Notifications"><Bell size={18}/></button><div className="avatar">CR</div></div></header>
      <div className="content">
        <div className="notice-banner"><AlertTriangle size={18}/><div><b>Prototype status — not production-secure yet</b><p>Data is stored only in this browser session. Login, server-side permissions, real blocking, live scans, AI APIs, backups and APK packaging are not connected.</p></div></div>
        {notice && <div className="toast" role="status"><CheckCircle2 size={17}/>{notice}<button onClick={() => setNotice('')} aria-label="Dismiss"><X size={16}/></button></div>}
        {active === 'overview' && <>
          <div className="page-heading"><div><div className="eyebrow">SECURITY OPERATIONS</div><h1>Good to see you.</h1><p>Investigate safely, train with simulations, and track authorized work.</p></div><button className="primary-button" onClick={exportReport}><Download size={17}/> Export workspace</button></div>
          <div className="stats-grid"><Stat icon={Activity} label="Platform status" value="Prototype" note="Buildable web foundation" tone="blue"/><Stat icon={LockKeyhole} label="Security controls" value="Not verified" note="Backend required" tone="amber"/><Stat icon={Network} label="Live assessments" value="0" note="No scanner connected" tone="purple"/><Stat icon={Globe} label="Blocking rules" value={rules.length} note="Simulation only" tone="green"/></div>
          <div className="section-title"><div><h2>Security workspaces</h2><p>Choose a module to continue.</p></div><span className="muted-tag">10 modules</span></div>
          <div className="module-grid">{cards.map(card => { const Icon = card.icon; return <button className="module-card" key={card.title} onClick={() => setActive(({ 'Code Lab':'codelab','Authorized assessments':'assessments','Website & app blocking':'blocking','Incident response':'incidents' })[card.title] || 'overview')}><div className="module-icon"><Icon size={20}/></div><div className="module-status">{card.status}</div><h3>{card.title}</h3><p>{card.desc}</p><span className="card-link">Open workspace <ChevronRight size={15}/></span></button>; })}</div>
          <div className="bottom-grid"><section className="panel"><div className="panel-heading"><div><h2>Recent activity</h2><p>Activity in this browser session</p></div><Clock3 size={18}/></div><div className="activity-row"><span className="activity-icon good"><CheckCircle2 size={17}/></span><div><b>Workspace initialized</b><p>Prototype loaded locally</p></div><time>Now</time></div><div className="activity-row"><span className="activity-icon warn"><AlertTriangle size={17}/></span><div><b>Integrations pending</b><p>Live services need configuration</p></div><time>Now</time></div></section><section className="panel"><div className="panel-heading"><div><h2>Next steps</h2><p>Before real-world use</p></div><ListChecks size={18}/></div><ul className="check-list"><li><span className="step-number">1</span>Connect a secure backend and authentication</li><li><span className="step-number">2</span>Enforce server-side client permissions</li><li><span className="step-number">3</span>Configure and test integrations</li></ul><button className="text-button" onClick={() => setActive('settings')}>View setup checklist <ChevronRight size={15}/></button></section></div>
        </>}
        {active === 'blocking' && <><PageHeading eyebrow="DEVICE ACCESS CONTROLS" title="Website & App Blocking" subtitle="Create and manage simulated rules for devices you own or are authorized to manage."/><div className="info-card"><LockKeyhole size={20}/><div><b>Enforcement is not connected</b><p>These rules are stored in browser memory only. Actual blocking requires a supported DNS/VPN filter, router configuration, or Android device-management integration. This prototype cannot block apps or clear their private data.</p></div></div><section className="panel"><div className="panel-heading"><div><h2>Add a website rule</h2><p>Use test domains or domains you are authorized to manage.</p></div><Plus size={18}/></div><form className="form-grid" onSubmit={addRule}><label>Domain<input value={domain} onChange={e=>setDomain(e.target.value)} placeholder="example.com" required/></label><label>Reason<input value={reason} onChange={e=>setReason(e.target.value)} placeholder="Why should this be blocked?"/></label><button className="primary-button" type="submit"><Plus size={16}/> Save simulated rule</button></form></section><section className="panel"><div className="panel-heading list-heading"><div><h2>Blocklist</h2><p>{rules.length} rules in this session</p></div><div className="search-box"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search rules"/></div></div>{filteredRules.length ? <div className="table-wrap"><table><thead><tr><th>Domain</th><th>Reason</th><th>Scope</th><th>Status</th><th></th></tr></thead><tbody>{filteredRules.map(rule=><tr key={rule.id}><td><b>{rule.domain}</b></td><td>{rule.reason}</td><td>{rule.scope}</td><td><span className="status-chip neutral">{rule.status}</span></td><td><button className="small-button" onClick={()=>{setRules(prev=>prev.filter(r=>r.id!==rule.id));setNotice('Rule removed from this browser session. No device policy changed.')}}>Remove</button></td></tr>)}</tbody></table></div>:<div className="empty-state">No rules match your search.</div>}</section></>}
        {active === 'assessments' && <><PageHeading eyebrow="AUTHORIZED SECURITY TESTING" title="Assessment workspace" subtitle="Record an authorized assessment before any testing takes place."/><div className="info-card"><ShieldCheck size={20}/><div><b>Authorization is mandatory</b><p>This prototype records scope only. It does not scan networks, exploit systems, or verify written authorization.</p></div></div><section className="panel"><h2>New assessment record</h2><form className="stack-form" onSubmit={createAssessment}><label>Assessment name<input value={assessmentName} onChange={e=>setAssessmentName(e.target.value)} placeholder="e.g. Internal firewall configuration review" required/></label><label className="check-label"><input type="checkbox" checked={authorized} onChange={e=>setAuthorized(e.target.checked)}/> I confirm written permission and a defined scope exist.</label><button className="primary-button" type="submit">Create assessment record <ChevronRight size={16}/></button></form></section><section className="panel"><div className="panel-heading"><div><h2>Assessment records</h2><p>Records created in this session</p></div></div>{assessments.length ? assessments.map(a=><div className="record-row" key={a.id}><div className="record-icon"><Network size={18}/></div><div className="record-main"><b>{a.name}</b><p>{a.date} · {a.status}</p></div><span className="status-chip neutral">Not scanned</span></div>) : <div className="empty-state">No assessment records yet.</div>}</section></>}
        {active === 'logs' && <><PageHeading eyebrow="EVENT INVESTIGATION" title="Log Analysis" subtitle="Inspect sample or authorized logs for simple warning patterns."/><section className="panel"><label>Log content<textarea className="log-input" value={logs} onChange={e=>setLogs(e.target.value)} rows="8" spellCheck="false"/></label><div className="button-row"><button className="primary-button" onClick={analyzeLogs}><FileSearch size={16}/> Analyze locally</button><button className="secondary-button" onClick={()=>{setLogs('');setLogSummary(null)}}><RotateCcw size={16}/> Clear</button></div><p className="field-help">Local pattern matching only; this is not an AI analysis or a complete detection engine.</p></section>{logSummary && <section className="panel"><h2>Analysis summary</h2><div className="stats-grid compact"><Stat icon={FileSearch} label="Lines processed" value={logSummary.count} note="Local text only" tone="blue"/><Stat icon={AlertTriangle} label="Potential warning lines" value={logSummary.warnings} note="Keyword matches, not confirmed incidents" tone="amber"/></div>{logSummary.items.map((line,i)=><div className="log-result" key={i}><AlertTriangle size={16}/><code>{line}</code></div>)}</section>}</>}
        {active === 'codelab' && <><PageHeading eyebrow="LEARN DEFENSIVE CODING" title="Code Lab" subtitle="Review a safe sample and learn what defensive validation looks like."/><section className="panel"><div className="panel-heading"><div><h2>Example: validate a domain input</h2><p>Read-only example. It does not scan or contact the domain.</p></div><Code2 size={19}/></div><pre className="code-block"><code>{`function validateDomain(value) {
  const domain = value.trim().toLowerCase();
  const valid = /^[a-z0-9.-]+$/.test(domain)
    && domain.includes('.');

  return {
    valid,
    normalized: valid ? domain : null
  };
}

// Always validate on the server too.
// Never trust client-side checks alone.`}</code></pre><div className="info-card"><ShieldCheck size={20}/><div><b>Security note</b><p>Client-side validation improves usability but is not an authorization or security boundary. Sensitive actions must be checked server-side.</p></div></div></section></>}
        {active === 'training' && <><PageHeading eyebrow="SAFE SIMULATED EXERCISES" title="Training Lab" subtitle="Practice interpreting fictional defensive-security scenarios."/><div className="exercise-list">{[{id:'firewall',title:'Firewall rule review',desc:'A rule allows inbound access from any address to a management port. What should you do first?',options:['Approve it immediately','Verify business need and restrict source scope','Disable all firewall rules']},{id:'logs',title:'Repeated login failures',desc:'A sample log shows repeated failures for one account. What is a good first step?',options:['Delete the logs','Check context, source, and account activity','Assume compromise without review']}].map(ex=><section className="panel exercise" key={ex.id}><div className="exercise-top"><span className="exercise-tag">GUIDED</span>{trainingDone.includes(ex.id)&&<span className="completed"><CheckCircle2 size={14}/> Completed</span>}</div><h2>{ex.title}</h2><p>{ex.desc}</p>{ex.options.map((option,i)=><button key={option} className="option-button" onClick={()=>{if(i===1){setTrainingDone(prev=>prev.includes(ex.id)?prev:[...prev,ex.id]);setNotice('Correct. Verify context and narrow permissions before taking action.')}else setNotice('Try again. Choose the option that verifies context and reduces risk safely.')}}>{option}</button>)}</section>)}</div></>}
        {active === 'incidents' && <><PageHeading eyebrow="RESPONSE COORDINATION" title="Incident Response" subtitle="A starter workflow for documenting incidents and next actions."/><div className="incident-steps">{[['1','Record','Document the time, affected asset, and initial report.'],['2','Validate','Preserve relevant logs and verify the signal.'],['3','Contain','Choose an authorized, proportionate containment step.'],['4','Recover','Apply the fix and confirm normal operation.'],['5','Review','Record lessons learned and preventive actions.']].map(s=><div className="incident-step" key={s[0]}><span>{s[0]}</span><div><b>{s[1]}</b><p>{s[2]}</p></div></div>)}</div></>}
        {active === 'intel' && <><PageHeading eyebrow="ASSISTED ANALYSIS" title="AI & Threat Intelligence" subtitle="Integration setup status and safe next steps."/><div className="integration-grid">{[['AI analysis provider','Not connected','Requires a configured server-side API key and privacy review.'],['Threat intelligence feed','Not connected','Requires a provider account, API credentials, rate-limit handling and source attribution.'],['Live network assessment','Not connected','Requires approved scope and a permitted, tested assessment integration.']].map(row=><div className="panel integration-card" key={row[0]}><div className="integration-head"><BrainCircuit size={20}/><span className="status-chip warning">{row[1]}</span></div><h3>{row[0]}</h3><p>{row[2]}</p></div>)}</div></>}
        {active === 'compliance' && <><PageHeading eyebrow="GOVERNANCE" title="Compliance & Risk" subtitle="Track starter controls. This checklist is not a certification."/><section className="panel"><div className="control-row"><div><b>Access control</b><p>Define roles and verify server-side enforcement.</p></div><span className="status-chip warning">Needs implementation</span></div><div className="control-row"><div><b>Audit logging</b><p>Record who changed what and when on a trusted backend.</p></div><span className="status-chip warning">Needs implementation</span></div><div className="control-row"><div><b>Backup and restore</b><p>Run a restore test and document recovery objectives.</p></div><span className="status-chip warning">Not tested</span></div><div className="control-row"><div><b>Incident response</b><p>Assign responders and rehearse the recovery workflow.</p></div><span className="status-chip neutral">Guidance only</span></div></section></>}
        {active === 'settings' && <><PageHeading eyebrow="CONFIGURATION & RELEASE" title="Setup & Release Readiness" subtitle="Honest status of the prototype and what is required next."/><section className="panel"><div className="release-row"><div><b>Web build</b><p>Vite + React app scaffold; CI workflow is configured in repository.</p></div><span className="status-chip neutral">Pending CI run</span></div><div className="release-row"><div><b>Authentication and server authorization</b><p>No backend identity provider or server-side policies connected.</p></div><span className="status-chip warning">Not implemented</span></div><div className="release-row"><div><b>Android APK</b><p>No native wrapper or signed APK generated yet.</p></div><span className="status-chip warning">Not built</span></div><div className="release-row"><div><b>Backups and restore</b><p>Local browser state is temporary; no persistent backup system.</p></div><span className="status-chip warning">Not implemented</span></div><div className="release-row"><div><b>Security validation</b><p>Requires backend, integration and authorization tests.</p></div><span className="status-chip warning">Not tested</span></div><div className="release-row"><div><b>Data export</b><p>Export a JSON snapshot of current browser-session records.</p></div><button className="secondary-button" onClick={exportReport}><Download size={15}/> Export</button></div></section><section className="panel"><h2>Recommended build sequence</h2><ol className="numbered-list"><li>Connect an authenticated backend and enforce tenant separation server-side.</li><li>Add tests for access control, validation, and core workflows.</li><li>Connect external integrations only after credentials and permissions are configured.</li><li>Wrap the responsive web app for Android and test on a real device.</li><li>Configure signing, privacy disclosures, backups, and release checks.</li></ol></section></>}
        <footer className="footer"><span>CYBERRECOVER AI · Defensive security workspace</span><span>Prototype build · Do not use for production investigations</span></footer>
      </div>
    </main>
  </div>;
}

function PageHeading({eyebrow,title,subtitle}) { return <div className="page-heading simple"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p></div></div>; }
function Stat({icon:Icon,label,value,note,tone}) { return <div className="stat-card"><div className={'stat-icon '+tone}><Icon size={19}/></div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-note">{note}</div></div>; }

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);