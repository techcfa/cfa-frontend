"use client";

import React, { useEffect, useState } from 'react';
import { AdminAuthProvider, useAdminAuth } from '@/app/contexts/AdminAuthContext';
import { adminService, MediaItem, UpdateMediaRequest } from '@/app/services/adminService';
import AdminNavbar from '../components/AdminNavbar';
import { Upload, Eye, Trash2, Edit, Image as ImageIcon, Video, Filter, RefreshCw } from 'lucide-react';
import styled from 'styled-components';

const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

const TabContainer = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 0.5rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  ${props => props.active 
    ? `
      background: white;
      color: #667eea;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `
    : `
      background: transparent;
      color: rgba(255, 255, 255, 0.8);
      &:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
      }
    `
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const FormGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  padding: 0.6rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  min-width: 0;
  flex: 1;
  white-space: nowrap;
  
  ${props => {
    switch (props.variant) {
      case 'danger':
        return `
          background: #dc2626;
          color: white;
          &:hover { background: #b91c1c; }
          &:disabled { background: #fca5a5; cursor: not-allowed; }
        `;
      case 'secondary':
        return `
          background: #f3f4f6;
          color: #374151;
          &:hover { background: #e5e7eb; }
          &:disabled { background: #f9fafb; cursor: not-allowed; }
        `;
      default:
        return `
          background: #667eea;
          color: white;
          &:hover { background: #5a67d8; }
          &:disabled { background: #a5b4fc; cursor: not-allowed; }
        `;
    }
  }}
`;

const FileUploadArea = styled.div<{ isDragOver?: boolean }>`
  border: 2px dashed #d1d5db;
  border-radius: 0.75rem;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  
  ${props => props.isDragOver && `
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.05);
  `}
  
  &:hover {
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.02);
  }
`;

const UploadIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
`;

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const MediaCard = styled.div`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  }
`;

const MediaPreview = styled.div`
  position: relative;
  height: 200px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const MediaImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MediaVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MediaPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
`;

const MediaContent = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const MediaTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
`;

const MediaDescription = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  line-height: 1.4;
`;

const MediaMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: #6b7280;
`;

const Badge = styled.span<{ variant?: 'success' | 'info' }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  
  ${props => {
    switch (props.variant) {
      case 'success':
        return 'background: #dcfce7; color: #166534;';
      default:
        return 'background: #dbeafe; color: #1e40af;';
    }
  }}
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const Select = styled.select`
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  background: white;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  padding: 1rem;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #166534;
  padding: 1rem;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
`;

const EditModal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0;
  
  &:hover {
    color: #374151;
  }
`;

const MediaInner: React.FC = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<'gallery' | 'upload'>('gallery');
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [filteredMedia, setFilteredMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  
  // Filter state
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video'>('all');
  
  // Edit modal state
  const [editModal, setEditModal] = useState<{ isOpen: boolean; media: MediaItem | null }>({
    isOpen: false,
    media: null
  });
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [updating, setUpdating] = useState(false);

  const loadMedia = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await adminService.listAllMedia({ page: 1, limit: 50 });
      setMediaList(response.media);
      setFilteredMedia(response.media);
    } catch (e: any) {
      setError(e.response?.data?.message || 'Failed to load media');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadMedia();
    }
  }, [isAuthenticated]);

  // Filter media based on type
  useEffect(() => {
    if (typeFilter === 'all') {
      setFilteredMedia(mediaList);
    } else {
      setFilteredMedia(mediaList.filter(media => media.type === typeFilter));
    }
  }, [mediaList, typeFilter]);

  const handleFileUpload = async () => {
    if (!uploadFile || !uploadTitle.trim() || !uploadDescription.trim()) {
      setError('Please fill in all fields and select a file');
      return;
    }

    if (uploadTitle.length < 3 || uploadTitle.length > 100) {
      setError('Title must be between 3 and 100 characters');
      return;
    }

    if (uploadDescription.length < 10 || uploadDescription.length > 500) {
      setError('Description must be between 10 and 500 characters');
      return;
    }
    
    setUploading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await adminService.uploadMedia(uploadFile, uploadTitle, uploadDescription);
      setSuccess(`Media uploaded successfully: ${response.media.title}`);
      setUploadFile(null);
      setUploadTitle('');
      setUploadDescription('');
      await loadMedia();
    } catch (e: any) {
      setError(e.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteMedia = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    try {
      await adminService.deleteMedia(id);
      setSuccess('Media deleted successfully!');
      await loadMedia();
    } catch (e: any) {
      setError(e.response?.data?.message || 'Failed to delete media');
    }
  };

  const openEditModal = (media: MediaItem) => {
    setEditModal({ isOpen: true, media });
    setEditTitle(media.title);
    setEditDescription(media.description);
  };

  const closeEditModal = () => {
    setEditModal({ isOpen: false, media: null });
    setEditTitle('');
    setEditDescription('');
  };

  const handleUpdateMedia = async () => {
    if (!editModal.media || !editTitle.trim() || !editDescription.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (editTitle.length < 3 || editTitle.length > 100) {
      setError('Title must be between 3 and 100 characters');
      return;
    }

    if (editDescription.length < 10 || editDescription.length > 500) {
      setError('Description must be between 10 and 500 characters');
      return;
    }

    setUpdating(true);
    setError('');

    try {
      await adminService.updateMedia(editModal.media._id, {
        title: editTitle,
        description: editDescription
      });
      setSuccess('Media updated successfully!');
      closeEditModal();
      await loadMedia();
    } catch (e: any) {
      setError(e.response?.data?.message || 'Failed to update media');
    } finally {
      setUpdating(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        setUploadFile(file);
      } else {
        setError('Only image and video files are allowed');
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading || !isAuthenticated) return null;

  return (
    <>
      <AdminNavbar />
    <Page>
      <Container>
          <Header>
        <Title>Media Management</Title>
            <Subtitle>Upload images and videos directly to AWS S3</Subtitle>
          </Header>

          <TabContainer>
            <Tab active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')}>
              <Eye size={18} />
              Media Gallery ({filteredMedia.length})
            </Tab>
            <Tab active={activeTab === 'upload'} onClick={() => setActiveTab('upload')}>
              <Upload size={18} />
              Upload Media
            </Tab>
          </TabContainer>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          {/* Media Gallery Tab */}
          {activeTab === 'gallery' && (
            <>
              <FilterBar>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Filter size={16} />
                  <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Filter:</span>
                </div>
                <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as any)}>
                  <option value="all">All Media</option>
                  <option value="image">Images Only</option>
                  <option value="video">Videos Only</option>
                </Select>
                <Button variant="secondary" onClick={loadMedia} disabled={loading}>
                  <RefreshCw size={16} />
                  {loading ? 'Loading...' : 'Refresh'}
                </Button>
              </FilterBar>

              {filteredMedia.length === 0 ? (
                <Card>
                  <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                    <ImageIcon size={64} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                    <h3 style={{ margin: '0 0 0.5rem', color: '#374151' }}>No media found</h3>
                    <p style={{ margin: '0' }}>
                      {typeFilter === 'all' 
                        ? 'Upload your first image or video to get started!' 
                        : `No ${typeFilter}s found. Try changing the filter or upload new content.`
                      }
                    </p>
                  </div>
                </Card>
              ) : (
                <MediaGrid>
                  {filteredMedia.map((media) => (
                    <MediaCard key={media._id}>
                      <MediaPreview>
                        {media.type === 'image' ? (
                          <MediaImage src={media.mediaUrl} alt={media.title} />
                        ) : media.type === 'video' ? (
                          <MediaVideo src={media.mediaUrl} controls />
                        ) : (
                          <MediaPlaceholder>
                            {media.type === 'image' ? <ImageIcon size={48} /> : <Video size={48} />}
                            <span>Preview not available</span>
                          </MediaPlaceholder>
                        )}
                      </MediaPreview>
                      
                      <MediaContent>
                        <MediaTitle>{media.title}</MediaTitle>
                        <MediaDescription>{media.description}</MediaDescription>
                        
                        <MediaMeta>
                          <div>
                            <Badge variant={media.type === 'image' ? 'success' : 'info'}>
                              {media.type}
                            </Badge>
                            <span style={{ marginLeft: '0.5rem' }}>
                              {formatFileSize(media.fileSize)}
                            </span>
                          </div>
                        </MediaMeta>
                        
                        <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '1rem' }}>
                          <div><strong>Type:</strong> {media.mimeType}</div>
                          <div><strong>Uploaded:</strong> {formatDate(media.createdAt)}</div>
                        </div>

                        <ActionButtons>
                          <Button variant="secondary" onClick={() => openEditModal(media)} title="Edit media details">
                            <Edit size={12} />
                            Edit
                          </Button>
                          <Button variant="danger" onClick={() => handleDeleteMedia(media._id, media.title)} title="Delete media">
                            <Trash2 size={12} />
                            Delete
                          </Button>
                        </ActionButtons>
                      </MediaContent>
                    </MediaCard>
                  ))}
                </MediaGrid>
              )}
            </>
          )}

          {/* Upload Tab */}
          {activeTab === 'upload' && (
        <Grid>
          <Card>
                              <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '700' }}>
                Upload Media
              </h2>
                
                <FileUploadArea
                  isDragOver={dragOver}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('fileInput')?.click()}
                >
                  <UploadIcon>
                    <Upload size={32} />
                  </UploadIcon>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#374151', fontSize: '1.1rem' }}>
                    {uploadFile ? uploadFile.name : 'Choose file or drag here'}
                  </h3>
                  <p style={{ margin: '0', color: '#6b7280', fontSize: '0.9rem' }}>
                    Images: JPEG, PNG, GIF, WebP • Videos: MP4, AVI, MOV, WebM, MKV
                  </p>
                  <p style={{ margin: '0.5rem 0 0', color: '#6b7280', fontSize: '0.85rem' }}>
                    Maximum file size: 100MB
                  </p>
                  <input
                    id="fileInput"
                    type="file"
                    style={{ display: 'none' }}
                    accept="image/*,video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setUploadFile(file);
                    }}
                  />
                </FileUploadArea>

                {uploadFile && (
                  <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem' }}>
                    <h4 style={{ margin: '0 0 0.75rem', color: '#374151' }}>Selected File:</h4>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                      <div><strong>Name:</strong> {uploadFile.name}</div>
                      <div><strong>Size:</strong> {formatFileSize(uploadFile.size)}</div>
                      <div><strong>Type:</strong> {uploadFile.type}</div>
                    </div>
                  </div>
                )}

                <FormGrid style={{ marginTop: '1.5rem' }}>
                  <div>
                    <Label>Title *</Label>
                    <Input
                      type="text"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      placeholder="Enter media title (3-100 characters)"
                      maxLength={100}
                    />
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.25rem' }}>
                      {uploadTitle.length}/100 characters
                    </div>
                  </div>

                  <div>
                    <Label>Description *</Label>
                    <Textarea
                      value={uploadDescription}
                      onChange={(e) => setUploadDescription(e.target.value)}
                      placeholder="Enter media description (10-500 characters)"
                      rows={4}
                      maxLength={500}
                    />
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.25rem' }}>
                      {uploadDescription.length}/500 characters
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <Button 
                      onClick={handleFileUpload} 
                      disabled={uploading || !uploadFile || !uploadTitle.trim() || !uploadDescription.trim()}
                    >
                      <Upload size={16} />
                      {uploading ? 'Uploading Media...' : 'Upload Media'}
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={() => {
                        setUploadFile(null);
                        setUploadTitle('');
                        setUploadDescription('');
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                </FormGrid>
          </Card>


        </Grid>
          )}
      </Container>
    </Page>

      {/* Edit Modal */}
      <EditModal isOpen={editModal.isOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Edit Media</ModalTitle>
            <CloseButton onClick={closeEditModal}>×</CloseButton>
          </ModalHeader>

          <FormGrid>
            <div>
              <Label>Title *</Label>
              <Input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Enter media title (3-100 characters)"
                maxLength={100}
              />
              <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.25rem' }}>
                {editTitle.length}/100 characters
              </div>
            </div>

            <div>
              <Label>Description *</Label>
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Enter media description (10-500 characters)"
                rows={4}
                maxLength={500}
              />
              <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.25rem' }}>
                {editDescription.length}/500 characters
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <Button 
                onClick={handleUpdateMedia} 
                disabled={updating || !editTitle.trim() || !editDescription.trim()}
              >
                {updating ? 'Updating...' : 'Update Media'}
              </Button>
              <Button variant="secondary" onClick={closeEditModal}>
                Cancel
              </Button>
            </div>
          </FormGrid>
        </ModalContent>
      </EditModal>
    </>
  );
};

const MediaPage: React.FC = () => (
  <AdminAuthProvider>
    <MediaInner />
  </AdminAuthProvider>
);

export default MediaPage;