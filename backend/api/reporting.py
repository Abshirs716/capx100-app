import io
import datetime as dt
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

def build_pdf(data: dict, logo_bytes: bytes | None = None) -> bytes:
    buf = io.BytesIO()
    doc = SimpleDocTemplate(buf, pagesize=A4)
    styles = getSampleStyleSheet()
    
    elems = []
    elems.append(Paragraph("Portfolio X-Ray Pro™", styles["Title"]))
    elems.append(Paragraph("Risk Analytics Report", styles["Heading2"]))
    elems.append(Spacer(1, 12))
    
    meta = f"Client: {data.get('client','—')} • Date: {data.get('as_of', dt.date.today().isoformat())}"
    elems.append(Paragraph(meta, styles["BodyText"]))
    
    if ts := data.get("transparency_score"):
        elems.append(Paragraph(f"Transparency Score™: <b>{ts}%</b>", styles["Heading2"]))
    
    doc.build(elems)
    return buf.getvalue()
