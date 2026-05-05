import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, MapPin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-3xl font-heading font-black text-white tracking-wider flex items-center gap-2 mb-4 inline-block">
              <span className="text-primary">X</span>ZETIO
            </Link>
            <p className="text-muted-foreground max-w-md font-sans mb-6">
              Pakistan's Elite Gaming Accessory Store. Equip yourself with the best gear to dominate the competition. High performance, zero compromise.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://wa.me/923348590229" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-green-500 hover:border-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all"
              >
                <MessageCircle size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-pink-500 hover:border-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6 text-white uppercase tracking-wider">Arsenal</h4>
            <ul className="space-y-3">
              <li><Link to="/shop?category=Headphones" className="text-muted-foreground hover:text-primary transition-colors uppercase text-sm">Headphones</Link></li>
              <li><Link to="/shop?category=Earbuds" className="text-muted-foreground hover:text-primary transition-colors uppercase text-sm">Earbuds</Link></li>
              <li><Link to="/shop?category=Cooling Fans" className="text-muted-foreground hover:text-primary transition-colors uppercase text-sm">Cooling Fans</Link></li>
              <li><Link to="/shop?category=Mobile Accessories" className="text-muted-foreground hover:text-primary transition-colors uppercase text-sm">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6 text-white uppercase tracking-wider">Comm Center</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                <span>Level 4, Gaming Hub Plaza, DHA Phase 6, Lahore, Pakistan</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <MessageCircle size={18} className="text-primary shrink-0" />
                <span>+92 334 8590229</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail size={18} className="text-primary shrink-0" />
                <span>support@shopxzetio.pk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} SHOPXZETIO. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/admin/login" className="text-xs text-muted-foreground hover:text-primary transition-colors">Admin Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
