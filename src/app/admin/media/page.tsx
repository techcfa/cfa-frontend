"use client";

import React, { useEffect, useState } from 'react';
import { AdminAuthProvider, useAdminAuth } from '@/app/contexts/AdminAuthContext';
import { adminService, MediaItem, CreateMediaRequest } from '@/app/services/adminService';
import styled from 'styled-components';

const Page = styled.div`min-height:100vh;background:#f8fafc;`;
const Container = styled.div`max-width:1100px;margin:0 auto;padding:2rem 1rem;`;
const Title = styled.h1`font-size:1.5rem;font-weight:800;color:#111827;margin:0 0 1rem 0;`;
const Grid = styled.div`display:grid;grid-template-columns:2fr 1fr;gap:1rem;@media(max-width:900px){grid-template-columns:1fr;}`;
const Card = styled.div`background:#fff;border-radius:1rem;padding:1.25rem;box-shadow:0 8px 20px rgba(0,0,0,0.08);`;
const Table = styled.table`width:100%;`;
const Th = styled.th`text-align:left;padding:.5rem;border-bottom:1px solid #e5e7eb;color:#374151;`;
const Td = styled.td`padding:.5rem;border-top:1px solid #e5e7eb;`;
const Label = styled.label`display:block;font-size:.875rem;color:#6b7280;margin:.25rem 0;`;
const Input = styled.input`width:100%;border:1px solid #e5e7eb;border-radius:.5rem;padding:.5rem .75rem;`;
const Textarea = styled.textarea`width:100%;border:1px solid #e5e7eb;border-radius:.5rem;padding:.5rem .75rem;`;
const Button = styled.button`border:none;border-radius:.5rem;background:#2563eb;color:#fff;font-weight:700;padding:.6rem 1rem;margin-top:.5rem;`;

const MediaInner: React.FC = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [list, setList] = useState<MediaItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState<CreateMediaRequest>({ title:'', description:'', type:'article', content:'', tags:[], isPublished:true, isBroadcast:false });
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);

  const load = async () => {
    try { setError(''); const res = await adminService.listAllMedia({ page:1, limit: 20 }); setList(res.media); }
    catch (e: any) { setError(e.response?.data?.message || 'Failed to load media'); }
  };

  useEffect(()=>{ if (isAuthenticated) load(); }, [isAuthenticated]);

  const create = async () => {
    setCreating(true); setError('');
    try {
      await adminService.createMedia(form);
      setForm({ title:'', description:'', type:'article', content:'', tags:[], isPublished:true, isBroadcast:false });
      await load();
    } catch (e: any) { setError(e.response?.data?.message || 'Failed to create'); }
    finally { setCreating(false); }
  };

  const upload = async () => {
    if (!file) return;
    try { setError(''); const res = await adminService.uploadMedia(file); alert(`Uploaded: ${res.fileUrl}`); }
    catch (e: any) { setError(e.response?.data?.message || 'Upload failed'); }
  };

  if (isLoading || !isAuthenticated) return null;

  return (
    <Page>
      <Container>
        <Title>Media Management</Title>
        {error && <Card style={{color:'#b91c1c'}}>{error}</Card>}
        <Grid>
          <Card>
            <Table>
              <thead>
                <tr><Th>Title</Th><Th>Type</Th><Th>Status</Th></tr>
              </thead>
              <tbody>
                {list.map((m)=> (
                  <tr key={m._id}>
                    <Td>{m.title}</Td>
                    <Td>{m.type}</Td>
                    <Td>{m.isPublished ? 'Published' : 'Draft'}{m.isBroadcast ? ' • Broadcast' : ''}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
          <Card>
            <h3>Create Media</h3>
            <Label>Title</Label>
            <Input value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} />
            <Label>Description</Label>
            <Textarea rows={3} value={form.description} onChange={(e)=>setForm({...form, description: e.target.value})} />
            <Label>Type</Label>
            <select value={form.type} onChange={(e)=>setForm({...form, type: e.target.value as any})}>
              <option value="article">article</option>
              <option value="video">video</option>
              <option value="podcast">podcast</option>
              <option value="update">update</option>
              <option value="alert">alert</option>
            </select>
            <Label>Content (HTML)</Label>
            <Textarea rows={6} value={form.content} onChange={(e)=>setForm({...form, content: e.target.value})} />
            <Label>Tags (comma)</Label>
            <Input value={form.tags?.join(', ') || ''} onChange={(e)=>setForm({...form, tags: e.target.value.split(',').map(t=>t.trim()).filter(Boolean)})} />
            <div style={{display:'flex', gap:'.5rem', marginTop:'.5rem'}}>
              <label><input type="checkbox" checked={form.isPublished} onChange={(e)=>setForm({...form, isPublished: e.target.checked})} /> Published</label>
              <label><input type="checkbox" checked={form.isBroadcast} onChange={(e)=>setForm({...form, isBroadcast: e.target.checked})} /> Broadcast</label>
            </div>
            <Button onClick={create} disabled={creating}>{creating? 'Creating...' : 'Create Media'}</Button>
            <div style={{height:'1px', background:'#e5e7eb', margin:'1rem 0'}} />
            <h3>Upload File</h3>
            <input type="file" onChange={(e)=>setFile(e.target.files?.[0] || null)} />
            <Button onClick={upload} style={{marginLeft:'.5rem'}}>Upload</Button>
          </Card>
        </Grid>
      </Container>
    </Page>
  );
};

const MediaPage: React.FC = () => (
  <AdminAuthProvider>
    <MediaInner />
  </AdminAuthProvider>
);

export default MediaPage;

