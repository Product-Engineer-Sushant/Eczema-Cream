import React, { useMemo, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { createRoot } from "react-dom/client";
import {
  ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, MessageCircle, Minus,
  Plus, ShieldCheck, ShoppingBag, Sparkles, Truck, X
} from "lucide-react";
import "./styles.css";

import img1 from "../src/assets/images/1.png"
import img2 from "../src/assets/images/2.png"
import img3 from "../src/assets/images/3.png"
import img4 from "../src/assets/images/4.PNG"
import img5 from "../src/assets/images/5.png"
import img6 from "../src/assets/images/6.PNG"

// Empty when the client and API share a deployment. Otherwise use the public API URL.
const API_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

const IMAGES = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
];

const benefits = [
  ["✨", "Intense Moisture & Hydration", "Helps replenish moisture in dry, rough skin and keeps it feeling soft, smooth, and comfortable."],
  ["💧", "Dry & Sensitive Skin Care", "Designed to provide soothing moisturization for dry, sensitive, and eczema- or psoriasis-prone skin."],
  ["🌿", "Skin Barrier Support", "Helps support the skin’s natural moisture barrier and reduce the feeling of dryness and tightness."],
  ["🌸", "Daily Comfort & Nourishment", "A nourishing moisturizer for everyday skincare, helping leave dry skin feeling hydrated, soft, and refreshed."]
];

const steps = [
  ["01", "Cleanse", "Wash your face and Clean the skin gently pat dry."],
  ["02", "Apply", "Apply a small amount of Eczemaron cream to the affected or dry areas."],
  ["03", "Massage", "Massage gently until the cream is absorbed"],
  ["04", "Use Daily", "Use regularly as directed on the product label or by your healthcare professional."],
  ["05", "Avoid", "Avoid contact with the eyes, mouth, and open wounds. If irritation occurs, discontinue use and seek professional advice."]
];

function App() {
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [orderOpen, setOrderOpen] = useState(false);
  const [form, setForm] = useState({ name:"", phone:"", district:"", municipality:"", address:"" });

  const total = useMemo(() => qty * 1000, [qty]);

  const change = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const [sending, setSending] = useState(false);

  const submitOrder = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.district || !form.municipality || !form.address) {
      toast("Please fill all required fields.");
      return;
    }

    setSending(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          quantity: qty,
          total
        })
      });

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : null;

      if (!response.ok || !data?.success) {
        if (!data) {
          throw new Error(
            "Order API is not available. Deploy the Express server and set VITE_API_URL to its public URL."
          );
        }
        throw new Error(data.message || "Order could not be sent.");
      }

      toast(`Order submitted successfully! Order ID: ${data.orderId}`);
      setOrderOpen(false);
      setForm({ name:"", phone:"", district:"", municipality:"", address:"" });
      setQty(1);
    } catch (error) {
      console.error(error);
      toast(error.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="page">
      <div className="topbar">
        <span>✨ Free shipping</span><span>•</span><span>Cash on Delivery available</span>
        <span>•</span><span>7-day easy replacement</span>
      </div>
      <main>
        <section className="hero">
          <div className="gallery">
            <div className="thumbs">
              {IMAGES.map((img, i) => (
                <button className={`thumb ${active === i ? "active" : ""}`} key={img} onClick={() => setActive(i)}>
                  <img src={img} alt={`Product view ${i + 1}`} />
                </button>
              ))}
            </div>
            <div className="mainImageWrap">
              <img className="mainImage" src={IMAGES[active]} alt="Sea Buckthorn Serum" />
              <button className="galleryArrow left" onClick={() => setActive((active - 1 + IMAGES.length) % IMAGES.length)}><ChevronLeft/></button>
              <button className="galleryArrow right" onClick={() => setActive((active + 1) % IMAGES.length)}><ChevronRight/></button>
            </div>
          </div>

          <div className="heroCopy">
            <h1>Eczemaron Psoriasis Moisturizing Cream <em>Deep Hydration for Dry & Irritated Skin</em></h1>
            <p className="subhead">Soothing Moisturizer for Dry Skin  Hydrating Care for Dry, Itchy & Sensitive Skin</p>

            <div className="rating"><span>★★★★★</span> <b>4.9</b> <small>• 1,200+ customer reviews</small></div>
            <div className="priceRow">
              <strong>Rs. 1000</strong>
              <del>Rs. 1,899</del>
              <span>Save Rs. 899</span>
            </div>

            <p className="description">
              Eczemaron Psoriasis Moisturizing Cream is a moisturizing cream designed to help care for dry, rough, itchy, and irritated skin associated with eczema and psoriasis-prone skin.
            </p>
            <p className="description">The cream helps :- </p>

            <div className="ml-8">
                <li>Moisturize and soften dry, rough skin.</li>
                <li>Reduce the feeling of dryness and tightness.</li>
                <li>Soothe skin that feels irritated or uncomfortable.</li>
                <li>Support the skin’s natural protective barrier.</li>
                <li>Keep the skin hydrated and more comfortable.</li>
            </div>

            <div className="qtyRow">
              <span>Quantity</span>
              <div className="qty">
                <button onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16}/></button>
                <b>{qty}</b>
                <button onClick={() => setQty(qty + 1)}><Plus size={16}/></button>
              </div>
              <button className="primaryCta" onClick={() => setOrderOpen(true)}>
              <ShoppingBag size={20}/> Order Now — Cash on Delivery 
            </button>
            </div>
          </div>
        </section>
          <div className="px-8 mb-4 -mt-8 flex justify-center items-center">
            <img src={img6} />
          </div>
        
        <section >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:mx-34">
              {/* Left Side */}
              <div className="p-8">
                <div className="sectionHead">
                  <span className="kicker">WHY YOU'LL LOVE IT</span>
                  <h2>
                    Simple care. <em>Natural glow.</em>
                  </h2>
                  <p>Designed for an easy everyday skincare routine.</p>
                </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map(([icon, title, text]) => (
                  <article className="benefit" key={title}>
                    <div className="benefitIcon">{icon}</div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>

              {/* Right Side */}
              <div className="p-8">
                
                <div className="howCopy">
                  <span className="kicker">HOW TO USE</span>
                  <h2>Your 4-step <em>glow routine</em></h2>
                  <div className="steps">
                    {steps.map(([num, title, text]) => (
                      <div className="step" key={num}>
                        <div className="stepNum">{num}</div>
                        <div><h3>{title}</h3><p>{text}</p></div>
                      </div>
                    ))}
                  </div>
                  <button className="outlineCta" onClick={() => setOrderOpen(true)}>Start your routine <ArrowRight size={18}/></button>
                </div>
              </div>
            </div>
          </section>
      </main>

      {orderOpen && (
        <div className="modalBackdrop" onMouseDown={(e) => e.target === e.currentTarget && setOrderOpen(false)}>
          <div className="orderModal">
            <button className="close" onClick={() => setOrderOpen(false)}><X/></button>
            <div className="modalTop">
              <span className="kicker">PLACE YOUR ORDER</span>
              <h2>Cash on Delivery</h2>
            </div>

            <div className="orderSummary">
              <div><span>Product</span><b>Sea Buckthorn Serum</b></div>
              <div><span>Quantity</span><b>{qty}</b></div>
              <div><span>Total</span><b>Rs. {total}</b></div>
            </div>

            <form onSubmit={submitOrder}>
              <label>Full name *<input value={form.name} onChange={e => change("name", e.target.value)} placeholder="Your full name"/></label>
              <label>Phone number *<input value={form.phone} onChange={e => change("phone", e.target.value)} placeholder="98XXXXXXXX" inputMode="tel"/></label>
              <div className="twoCol">
                <label>District / जिल्ला *<input value={form.district} onChange={e => change("district", e.target.value)} placeholder="e.g. Kathmandu"/></label>
                <label>Municipality / नगरपालिका *<input value={form.municipality} onChange={e => change("municipality", e.target.value)} placeholder="e.g. Kathmandu"/></label>
              </div>
              <label>Village / गाऊँ *<textarea value={form.address} onChange={e => change("address", e.target.value)} placeholder="Tole, ward no., landmark..." rows=""/></label>
              <button className="primaryCta bg- !w-full !bg-[#25d366]" type="submit" disabled={sending}>
                 <ShoppingBag size={20}/>
                {sending ? "Sending Order..." : "Confirm Your Order Now !!"}
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
