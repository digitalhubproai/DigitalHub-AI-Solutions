"""SQLAlchemy models for DigitalHub AI"""
from sqlalchemy import Column, Integer, String, Text, DateTime, func, JSON
from database import Base


class Lead(Base):
    """Lead model for capturing form and chatbot submissions"""
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    email = Column(String(255), nullable=False, index=True)
    contact = Column(String(50), nullable=True)
    message = Column(Text, nullable=True)
    source = Column(String(50), nullable=False, default="form")  # 'form' or 'chatbot'
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    status = Column(String(50), default="new")  # 'new', 'contacted', 'converted'


class ServiceRequest(Base):
    """Service request model for detailed service inquiries"""
    __tablename__ = "service_requests"

    id = Column(Integer, primary_key=True, index=True)
    service_type = Column(String(50), nullable=False, index=True)  # 'branding', 'web_development', etc.
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    contact = Column(String(50), nullable=True)
    form_data = Column(JSON, nullable=False)  # Store dynamic form data as JSON
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    status = Column(String(50), default="new")  # 'new', 'in_progress', 'completed'
