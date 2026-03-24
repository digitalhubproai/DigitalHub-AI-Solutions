import os
import httpx
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from sqlalchemy.orm import Session
import resend

from database import engine, get_db, Base
from models import Lead, ServiceRequest as ServiceRequestModel
from schemas import (
    LeadCreate, LeadResponse, ContactForm, ChatMessage, ChatRequest, LeadCapture,
    BrandingForm, WebDevelopmentForm, MobileAppForm, AIAgentsForm,
    DigitalMarketingForm, SEOForm, ServiceRequest, ServiceRequestResponse
)

# Create database tables
Base.metadata.create_all(bind=engine)

load_dotenv()

# Configure Resend API
resend.api_key = os.getenv("RESEND_API_KEY")
NOTIFICATION_EMAIL = os.getenv("NOTIFICATION_EMAIL", "your-email@gmail.com")

app = FastAPI(title="DigitalHub AI Solutions API")

# Setup CORS to allow Next.js frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://creativesar-digitalhubai.hf.space",
        "https://huggingface.co",
        "https://digitalhub-ai-solutions.hf.space"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Welcome to DigitalHub AI Solutions API"}


@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}


def send_contact_email(name: str, email: str, contact: str, message: str):
    """Send contact form notification email"""
    try:
        params = {
            "from": f"DigitalHub AI Solutions <onboarding@resend.dev>",
            "to": NOTIFICATION_EMAIL,
            "reply_to": email,
            "subject": f"📩 New Contact Form Submission from {name}",
            "html": f"""
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
                <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #2563eb; margin-bottom: 20px;">🎯 New Contact Form Submission</h2>
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <p style="margin: 10px 0;"><strong>👤 Name:</strong> {name}</p>
                        <p style="margin: 10px 0;"><strong>📧 Email:</strong> {email}</p>
                        <p style="margin: 10px 0;"><strong>📱 Contact:</strong> {contact or 'Not provided'}</p>
                        <p style="margin: 10px 0;"><strong>💬 Message:</strong></p>
                        <p style="margin: 10px 0; padding: 15px; background-color: white; border-left: 4px solid #2563eb; border-radius: 4px;">{message}</p>
                    </div>
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="mailto:{email}" style="display: inline-block; padding: 12px 30px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Reply to {name}</a>
                    </div>
                    <p style="margin-top: 30px; color: #64748b; font-size: 14px; text-align: center;">This is an automated notification from DigitalHub AI Solutions</p>
                </div>
            </div>
            """,
        }
        email_response = resend.Emails.send(params)
        print(f"✅ Contact email sent to {NOTIFICATION_EMAIL}: {email_response}")
        return True
    except Exception as e:
        print(f"❌ Failed to send contact email: {e}")
        return False


def send_service_request_email(service_type: str, name: str, email: str, contact: str, form_data: dict):
    """Send service request notification email"""
    try:
        # Build form data HTML
        form_details = ""
        for key, value in form_data.items():
            if value and key not in ['name', 'email', 'contact']:
                form_details += f'<p style="margin: 8px 0;"><strong>{key.replace("_", " ").title()}:</strong> {value}</p>'
        
        params = {
            "from": f"DigitalHub AI Solutions <onboarding@resend.dev>",
            "to": NOTIFICATION_EMAIL,
            "reply_to": email,
            "subject": f"🚀 New {service_type.replace('_', ' ').title()} Request from {name}",
            "html": f"""
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
                <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #16a34a; margin-bottom: 20px;">🎉 New Service Request Received</h2>
                    <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 2px solid #16a34a;">
                        <h3 style="color: #16a34a; margin-bottom: 15px;">📋 Service: {service_type.replace('_', ' ').title()}</h3>
                        <p style="margin: 10px 0;"><strong>👤 Name:</strong> {name}</p>
                        <p style="margin: 10px 0;"><strong>📧 Email:</strong> {email}</p>
                        <p style="margin: 10px 0;"><strong>📱 Contact:</strong> {contact or 'Not provided'}</p>
                        <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
                        <h4 style="color: #374151; margin-bottom: 10px;">📝 Form Details:</h4>
                        {form_details}
                    </div>
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="mailto:{email}" style="display: inline-block; padding: 12px 30px; background-color: #16a34a; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Contact {name}</a>
                    </div>
                    <p style="margin-top: 30px; color: #64748b; font-size: 14px; text-align: center;">This is an automated notification from DigitalHub AI Solutions</p>
                </div>
            </div>
            """,
        }
        email_response = resend.Emails.send(params)
        print(f"✅ Service request email sent to {NOTIFICATION_EMAIL}: {email_response}")
        return True
    except Exception as e:
        print(f"❌ Failed to send service request email: {e}")
        return False


def send_chatbot_lead_email(name: str, email: str, contact: str):
    """Send chatbot lead notification email"""
    try:
        params = {
            "from": f"DigitalHub AI Solutions <onboarding@resend.dev>",
            "to": NOTIFICATION_EMAIL,
            "reply_to": email,
            "subject": f"🤖 New Chatbot Lead: {name}",
            "html": f"""
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
                <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #9333ea; margin-bottom: 20px;">🤖 New Chatbot Lead Captured</h2>
                    <div style="background-color: #faf5ff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 2px solid #9333ea;">
                        <p style="margin: 10px 0;"><strong>👤 Name:</strong> {name}</p>
                        <p style="margin: 10px 0;"><strong>📧 Email:</strong> {email}</p>
                        <p style="margin: 10px 0;"><strong>📱 Contact:</strong> {contact or 'Not provided'}</p>
                        <p style="margin: 10px 0; color: #6b7280; font-size: 14px;">Lead captured via AI chatbot conversation</p>
                    </div>
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="mailto:{email}" style="display: inline-block; padding: 12px 30px; background-color: #9333ea; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Follow Up with {name}</a>
                    </div>
                    <p style="margin-top: 30px; color: #64748b; font-size: 14px; text-align: center;">This is an automated notification from DigitalHub AI Solutions</p>
                </div>
            </div>
            """,
        }
        email_response = resend.Emails.send(params)
        print(f"✅ Chatbot lead email sent to {NOTIFICATION_EMAIL}: {email_response}")
        return True
    except Exception as e:
        print(f"❌ Failed to send chatbot lead email: {e}")
        return False


def send_newsletter_subscription_email(email: str):
    """Send newsletter subscription confirmation to user"""
    try:
        params = {
            "from": f"DigitalHub AI Solutions <onboarding@resend.dev>",
            "to": email,
            "subject": "🎉 Welcome to DigitalHub AI Insights!",
            "html": f"""
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
                <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #2563eb; margin-bottom: 20px;">🎉 You're Subscribed!</h2>
                    <p style="font-size: 16px; line-height: 1.6; color: #374151;">
                        Hi there! 👋<br><br>
                        Thank you for subscribing to <strong>DigitalHub AI Insights</strong>! You'll now receive:<br><br>
                        ✨ <strong>Weekly AI Trends</strong> - Latest in artificial intelligence<br>
                        🚀 <strong>Web Development Tips</strong> - Modern techniques & best practices<br>
                        💡 <strong>Business Strategies</strong> - How to scale with AI<br>
                        📊 <strong>Industry Insights</strong> - Stay ahead of competitors<br><br>
                        We're excited to have you on board!<br><br>
                        Best regards,<br>
                        <strong style="color: #2563eb;">DigitalHub AI Solutions Team</strong>
                    </p>
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
                        <p style="color: #6b7280; font-size: 14px;">Don't want these emails? <a href="#" style="color: #2563eb;">Unsubscribe anytime</a></p>
                    </div>
                </div>
            </div>
            """,
        }
        email_response = resend.Emails.send(params)
        print(f"✅ Newsletter confirmation sent to {email}: {email_response}")
        return True
    except Exception as e:
        print(f"❌ Failed to send newsletter confirmation: {e}")
        return False


def send_newsletter_notification_email(email: str):
    """Send admin notification when someone subscribes"""
    try:
        params = {
            "from": f"DigitalHub AI Solutions <onboarding@resend.dev>",
            "to": NOTIFICATION_EMAIL,
            "subject": f"📬 New Newsletter Subscriber",
            "html": f"""
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
                <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #16a34a; margin-bottom: 20px;">📬 New Subscriber!</h2>
                    <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 2px solid #16a34a;">
                        <p style="margin: 10px 0;"><strong>📧 Email:</strong> {email}</p>
                        <p style="margin: 10px 0; color: #6b7280; font-size: 14px;">Subscriber joined via website footer</p>
                    </div>
                    <p style="color: #374151; font-size: 14px;">
                        A welcome email has been sent to the subscriber.
                    </p>
                    <p style="margin-top: 30px; color: #64748b; font-size: 14px; text-align: center;">This is an automated notification from DigitalHub AI Solutions</p>
                </div>
            </div>
            """,
        }
        email_response = resend.Emails.send(params)
        print(f"✅ Newsletter notification sent to {NOTIFICATION_EMAIL}: {email_response}")
        return True
    except Exception as e:
        print(f"❌ Failed to send newsletter notification: {e}")
        return False


@app.post("/api/contact", response_model=dict)
async def submit_contact(form: ContactForm, db: Session = Depends(get_db)):
    """Handle contact form submission and store as lead"""
    lead = Lead(
        name=form.name,
        email=form.email,
        contact=form.contact,
        message=form.message,
        source="form"
    )
    db.add(lead)
    db.commit()
    db.refresh(lead)
    
    # Send email notification
    send_contact_email(form.name, form.email, form.contact, form.message)
    
    return {"status": "success", "message": f"Thank you for contacting us, {form.name}! We'll reach you at {form.email} shortly."}


@app.post("/api/leads", response_model=dict)
async def capture_lead(lead: LeadCreate, db: Session = Depends(get_db)):
    """Capture lead from form or chatbot"""
    db_lead = Lead(
        name=lead.name,
        email=lead.email,
        contact=lead.contact,
        message=lead.message,
        source=lead.source
    )
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    print(f"🎯 New lead captured: {lead.name} ({lead.email}) from {lead.source}")
    return {"status": "success", "message": "Lead captured successfully"}


@app.post("/api/chatbot-lead", response_model=dict)
async def capture_chatbot_lead(lead: LeadCapture, db: Session = Depends(get_db)):
    """Specifically capture leads from chatbot"""
    db_lead = Lead(
        name=lead.name,
        email=lead.email,
        contact=lead.contact,
        message="Chatbot lead",
        source="chatbot"
    )
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    print(f"🎯 New chatbot lead captured: {lead.name} ({lead.email}) - {lead.contact}")
    
    # Send email notification
    send_chatbot_lead_email(lead.name, lead.email, lead.contact)
    
    return {"status": "success", "message": "Lead captured successfully"}


@app.get("/api/leads", response_model=List[LeadResponse])
async def get_all_leads(db: Session = Depends(get_db)):
    """Get all leads (for admin dashboard)"""
    leads = db.query(Lead).order_by(Lead.created_at.desc()).all()
    return leads


@app.post("/api/service-request", response_model=ServiceRequestResponse)
async def submit_service_request(request: ServiceRequest, db: Session = Depends(get_db)):
    """Submit a service-specific form request"""

    # Store the service request
    service_request = ServiceRequestModel(
        service_type=request.service_type,
        name=request.form_data.get("name", ""),
        email=request.form_data.get("email", ""),
        contact=request.form_data.get("contact", ""),
        form_data=request.form_data
    )
    db.add(service_request)
    db.commit()
    db.refresh(service_request)

    print(f"🎯 New service request: {request.service_type} from {service_request.name}")
    
    # Send email notification
    send_service_request_email(
        request.service_type,
        service_request.name,
        service_request.email,
        service_request.contact,
        request.form_data
    )

    return ServiceRequestResponse(
        status="success",
        message=f"Thank you! Your {request.service_type.replace('_', ' ')} request has been submitted. We'll contact you at {service_request.email} shortly.",
        service_type=request.service_type
    )


@app.get("/api/service-requests", response_model=List[dict])
async def get_all_service_requests(db: Session = Depends(get_db)):
    """Get all service requests (for admin dashboard)"""
    requests = db.query(ServiceRequestModel).order_by(ServiceRequestModel.created_at.desc()).all()
    return [
        {
            "id": r.id,
            "service_type": r.service_type,
            "name": r.name,
            "email": r.email,
            "contact": r.contact,
            "form_data": r.form_data,
            "created_at": r.created_at,
            "status": r.status
        }
        for r in requests
    ]


@app.post("/api/newsletter/subscribe", response_model=dict)
async def subscribe_newsletter(email: str):
    """Subscribe to newsletter"""
    try:
        # Send confirmation email to subscriber
        send_newsletter_subscription_email(email)
        
        # Send notification to admin
        send_newsletter_notification_email(email)
        
        return {"status": "success", "message": "Thank you for subscribing to DigitalHub AI Insights!"}
    except Exception as e:
        print(f"Newsletter subscription error: {e}")
        return {"status": "error", "message": "Failed to subscribe. Please try again."}


@app.post("/api/chat")
async def chat_with_agent(request: ChatRequest):
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="OpenRouter API Key not configured")

    async with httpx.AsyncClient() as client:
        try:
            # Convert Pydantic models to dict
            messages_list = []
            for m in request.messages:
                messages_list.append({"role": m.role, "content": m.content})

            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "HTTP-Referer": "http://localhost:3000",
                    "X-Title": "DigitalHub AI Solutions",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "deepseek/deepseek-chat",
                    "max_tokens": 1000,
                    "messages": [
                        {
                            "role": "system",
                            "content": (
                                "You are the DigitalHub AI Core, the official AI agent for 'DigitalHub AI Solutions'. "
                                "Our services: Fullstack Web Development, Mobile App Development, AI Agents & Solutions, Branding & Design (Logo, Graphics, UI/UX), Digital Marketing, and SEO. "
                                "Tone: Professional, friendly, helpful, and conversational. "
                                "IMPORTANT RULES: "
                                "1. FIRST MESSAGE GREETING: If the user says 'Hi', 'Hello', 'Hey', or any greeting, warmly greet them and briefly introduce services. Ask how you can help. DO NOT trigger any form yet. "
                                "2. PORTFOLIO REQUESTS (NO FORM): If user asks to SEE portfolio, projects, past work, examples, samples, logos, websites - SHOW portfolio info with links. DO NOT trigger form. Examples: "
                                "   - 'Show me your portfolio' → Show all 11 projects with categories and Dribbble link "
                                "   - 'Show me logo designs' → List logo projects: EximPortHub, Swiss Beauty Salon, Cretronix, Wagtails Essex "
                                "   - 'Show me websites you built' → List web projects: DigitalHub AI Platform, Passion & Profit "
                                "   - 'Can I see your work?' → Show portfolio with Dribbble link "
                                "3. SERVICE REQUESTS (TRIGGER FORM): Only trigger form when user clearly wants to ORDER/HIRE/BUY a service. Examples: "
                                "   - 'I need a website' → [SERVICE_FORM:web_development] "
                                "   - 'I want to order a logo' → [SERVICE_FORM:branding] "
                                "   - 'Hire you for app' → [SERVICE_FORM:mobile_app] "
                                "4. Service names: 'web_development', 'mobile_app', 'ai_agents', 'branding', 'seo'. "
                                "5. PRICING HANDLING: If client asks about price, cost, budget, or 'kitna hoga', NEVER give exact numbers. Say: 'Pricing is customized based on your specific requirements. Let me get your details first, and our team will send you a detailed quote.' THEN trigger the relevant service form. "
                                "6. NORMAL CHAT: If user is just asking general questions (not about services), respond normally WITHOUT triggering any form. Be helpful and conversational. "
                                "7. Be proactive in explaining how our solutions can scale their business. "
                                "8. Keep responses concise and engaging. "
                                "9. PORTFOLIO INFO: We have 11 projects: "
                                "- Web Development: DigitalHub AI Platform, Passion & Profit "
                                "- AI/Tech: AI Marketing Automation, Adresta (Swiss Blockchain), Greenlight Consulting (Enterprise AI), Cretronix (Software Logo) "
                                "- Print Design: Punjabi Touch Booklet (Restaurant Menu), Book Cover AlgoTrader "
                                "- Logo/Branding: EximPortHub (UK Import/Export), Swiss Beauty Salon, Wagtails Essex (Pet Care UK) "
                                "- Dribbble: https://dribbble.com/sarfraz_333 "
                                "10. When showing portfolio, always offer to discuss their project needs after. "
                                "EXAMPLES: "
                                "- User: 'Hi' → Bot: 'Hello! Welcome to DigitalHub AI Solutions! We specialize in Web Development, Mobile Apps, AI Solutions, Branding, Digital Marketing & SEO. How can I help you today?' (NO FORM) "
                                "- User: 'Show me your logo designs' → Bot: 'We've created logos for various clients including EximPortHub (UK import/export), Swiss Beauty Salon, Cretronix (software company), and Wagtails Essex (pet care). Check our full portfolio: https://dribbble.com/sarfraz_333 Would you like to discuss your logo project?' (NO FORM - only trigger if they say yes) "
                                "- User: 'Show me websites you built' → Bot: 'Our web development projects include DigitalHub AI Platform (AI solutions platform) and Passion & Profit (business consulting). See more: https://dribbble.com/sarfraz_333 Interested in building a website?' (NO FORM - only trigger if they say yes) "
                                "- User: 'I need a website for my business' → Bot: '[SERVICE_FORM:web_development] Perfect! We'd love to build your website. Please fill out this form so we understand your requirements...' "
                                "- User: 'How much for logo?' → Bot: '[SERVICE_FORM:branding] Pricing depends on complexity. Please fill this form and we'll send you a custom quote!' "
                                "- User: 'What is AI?' → Bot: 'AI (Artificial Intelligence) helps automate tasks... We build custom AI solutions. Would you like to explore this for your business?' (NO FORM unless they say yes) "
                            )
                        }
                    ] + messages_list,
                    "temperature": 0.7
                },
                timeout=60.0
            )

            if response.status_code != 200:
                print(f"OpenRouter API Error: {response.status_code} - {response.text}")
                raise HTTPException(status_code=response.status_code, detail="OpenRouter API error")

            resp_data = response.json()
            print(f"OpenRouter Response: {resp_data}")
            return resp_data
        except HTTPException:
            raise
        except Exception as e:
            print(f"Chat API Error: {e}")
            raise HTTPException(status_code=500, detail=f"Neural connection interrupted: {str(e)}")

