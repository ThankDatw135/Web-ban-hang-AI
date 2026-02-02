/**
 * Admin Campaigns API - Frontend client
 */

import apiClient from '../../api-client';

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  type: 'BANNER' | 'FLASH_SALE' | 'SEASONAL' | 'HOLIDAY' | 'PROMOTION';
  status: 'DRAFT' | 'SCHEDULED' | 'ACTIVE' | 'PAUSED' | 'ENDED';
  startDate: string;
  endDate: string;
  bannerUrl?: string;
  targetUrl?: string;
  views: number;
  clicks: number;
  createdAt: string;
  updatedAt: string;
}

export interface CampaignsResponse {
  data: Campaign[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CampaignStats {
  total: number;
  active: number;
  scheduled: number;
  ended: number;
  totalViews: number;
  totalClicks: number;
}

/**
 * Get all campaigns (admin)
 */
export async function getCampaigns(params?: {
  page?: number;
  limit?: number;
  status?: string;
  type?: string;
}): Promise<CampaignsResponse> {
  const response = await apiClient.get('/admin/campaigns', { params });
  return response.data;
}

/**
 * Get campaign by ID
 */
export async function getCampaignById(id: string): Promise<Campaign> {
  const response = await apiClient.get(`/admin/campaigns/${id}`);
  return response.data;
}

/**
 * Get campaign statistics
 */
export async function getCampaignStats(): Promise<CampaignStats> {
  const response = await apiClient.get('/admin/campaigns/stats');
  return response.data;
}

/**
 * Create new campaign
 */
export async function createCampaign(data: {
  name: string;
  description?: string;
  type: Campaign['type'];
  startDate: Date;
  endDate: Date;
  bannerUrl?: string;
  targetUrl?: string;
}): Promise<Campaign> {
  const response = await apiClient.post('/admin/campaigns', data);
  return response.data;
}

/**
 * Update campaign
 */
export async function updateCampaign(
  id: string,
  data: Partial<{
    name: string;
    description: string;
    type: Campaign['type'];
    status: Campaign['status'];
    startDate: Date;
    endDate: Date;
    bannerUrl: string;
    targetUrl: string;
  }>
): Promise<Campaign> {
  const response = await apiClient.patch(`/admin/campaigns/${id}`, data);
  return response.data;
}

/**
 * Delete campaign
 */
export async function deleteCampaign(id: string): Promise<void> {
  await apiClient.delete(`/admin/campaigns/${id}`);
}
