"""Pydantic schemas for API validation"""
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class LeadCreate(BaseModel):
    """Schema for creating a new lead"""
    name: str
    email: str
    contact: Optional[str] = None
    message: Optional[str] = None
    source: str = "form"  # 'form' or 'chatbot'


class LeadResponse(BaseModel):
    """Schema for lead response"""
    id: int
    name: str
    email: str
    contact: Optional[str]
    message: Optional[str]
    source: str
    created_at: datetime
    status: str

    class Config:
        from_attributes = True


class ContactForm(BaseModel):
    """Schema for contact form submission"""
    name: str
    email: str
    contact: Optional[str] = None
    message: str


class ChatMessage(BaseModel):
    """Schema for chat messages"""
    role: str
    content: str


class ChatRequest(BaseModel):
    """Schema for chat API request"""
    messages: list[ChatMessage]


class LeadCapture(BaseModel):
    """Schema for chatbot lead capture"""
    name: str
    email: str
    contact: str  # Required with country code


# ============ Service Request Forms ============

class BrandingForm(BaseModel):
    """Form for Branding & Design service requests (Logo, Graphics, UI/UX)"""
    name: str
    email: str
    contact: str  # Required with country code
    company_name: str
    tagline: Optional[str] = None
    project_type: str  # 'logo', 'brand_identity', 'graphic_design', 'ui_ux'
    industry: str
    target_audience: str
    style_preference: str
    colors_preferred: Optional[str] = None
    colors_avoid: Optional[str] = None
    design_inspiration: Optional[str] = None
    usage: Optional[str] = None
    competitors: Optional[str] = None
    timeline: Optional[str] = None
    budget: Optional[str] = None
    additional_info: Optional[str] = None


class WebDevelopmentForm(BaseModel):
    """Form for Fullstack Web Development service requests"""
    name: str
    email: str
    contact: str  # Required with country code
    company_name: str
    project_type: str  # 'website', 'web_app', 'ecommerce', 'landing_page'
    description: str
    features: str
    design_preference: Optional[str] = None
    reference_sites: Optional[str] = None
    pages_count: Optional[str] = None
    content_ready: Optional[str] = None
    domain_hosting: Optional[str] = None
    integrations: Optional[str] = None
    seo_needed: Optional[str] = None
    timeline: Optional[str] = None
    budget: Optional[str] = None
    maintenance: Optional[str] = None
    additional_info: Optional[str] = None


class MobileAppForm(BaseModel):
    """Form for Mobile App Development service requests"""
    name: str
    email: str
    contact: str  # Required with country code
    company_name: str
    app_type: str  # 'ios', 'android', 'cross_platform'
    description: str
    features: str
    design_preference: Optional[str] = None
    reference_apps: Optional[str] = None
    backend_needed: Optional[str] = None
    api_integrations: Optional[str] = None
    monetization: Optional[str] = None
    timeline: Optional[str] = None
    budget: Optional[str] = None
    additional_info: Optional[str] = None


class AIAgentsForm(BaseModel):
    """Form for AI Agents & Solutions service requests"""
    name: str
    email: str
    contact: str  # Required with country code
    company_name: str
    industry: str
    use_case: str
    tasks: str
    automation_level: Optional[str] = None
    integration_needed: Optional[str] = None
    data_sources: Optional[str] = None
    user_count: Optional[str] = None
    platform: Optional[str] = None
    security_requirements: Optional[str] = None
    timeline: Optional[str] = None
    budget: Optional[str] = None
    additional_info: Optional[str] = None


class DigitalMarketingForm(BaseModel):
    """Form for Digital Marketing service requests"""
    name: str
    email: str
    contact: str  # Required with country code
    company_name: str
    website: Optional[str] = None
    industry: str
    marketing_goal: str  # 'lead_gen', 'brand_awareness', 'sales', 'social_growth'
    target_audience: str
    current_channels: Optional[str] = None
    past_campaigns: Optional[str] = None
    competitors: Optional[str] = None
    unique_selling_point: Optional[str] = None
    content_assets: Optional[str] = None
    monthly_budget: Optional[str] = None
    ad_spend_budget: Optional[str] = None
    kpis: Optional[str] = None
    timeline: Optional[str] = None
    additional_info: Optional[str] = None


class SEOForm(BaseModel):
    """Form for SEO service requests"""
    name: str
    email: str
    contact: str  # Required with country code
    company_name: str
    website_url: str
    industry: str
    current_ranking: Optional[str] = None
    target_keywords: Optional[str] = None
    competitors: Optional[str] = None
    seo_audit_done: Optional[str] = None
    content_strategy: Optional[str] = None
    technical_issues: Optional[str] = None
    local_seo_needed: Optional[str] = None
    timeline: Optional[str] = None
    budget: Optional[str] = None
    additional_info: Optional[str] = None


class ServiceRequest(BaseModel):
    """Generic service request schema"""
    service_type: str  # 'branding', 'web_development', 'mobile_app', 'ai_agents', 'digital_marketing', 'seo'
    form_data: dict


class ServiceRequestResponse(BaseModel):
    """Response for service request submission"""
    status: str
    message: str
    service_type: str
