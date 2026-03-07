# NetVibeBD Website

Full-stack React + Node.js + Tailwind CSS product website.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express, JWT Authentication
- **Database**: Airtable (CMS)
- **Payment**: Manual (bKash, Nagad, Rocket, Bank Transfer)
- **Deployment**: Nginx + PM2 (Production)

## 🚀 Quick Start

### Local Development

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend (in a separate terminal)
cd backend
npm install
cp .env.example .env  # Configure your environment variables
npm start
```

### Environment Variables

Create `.env` files for both frontend and backend:

**Frontend (.env)**:
```bash
VITE_API_URL=http://localhost:4242
VITE_APP_URL=http://localhost:5173
VITE_AIRTABLE_BASE_ID=app...
VITE_AIRTABLE_TABLE_NAME=Products Info
VITE_AIRTABLE_PAT=pat...
VITE_GROQ_API_KEY=gsk_...
```

**Backend (.env)**:
```bash
PORT=4242
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-token-secret
AIRTABLE_PAT=pat...
AIRTABLE_BASE_ID=app...
AIRTABLE_TABLE_NAME=Products Info
AIRTABLE_USERS_TABLE_ID=tbl...
AIRTABLE_ORDERS_TABLE_ID=tbl...
AIRTABLE_PRODUCTS_TABLE_ID=tbl...
AIRTABLE_PROMO_CODES_TABLE_ID=tbl...
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🚀 Production Deployment

### Manual Deployment

1. **Build the application:**
```bash
# Frontend
cd frontend
npm install
npm run build

# Backend
cd ../backend
npm install --production
```

2. **Deploy Frontend:**
```bash
# Copy built files to web server
sudo cp -r frontend/dist/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
```

3. **Deploy Backend:**
```bash
# Start or restart backend with PM2
pm2 restart backend || pm2 start ecosystem.config.cjs --only backend --env production
pm2 save
```

4. **Restart Nginx:**
```bash
sudo systemctl restart nginx
```

### Monitoring

Check application status:
```bash
# PM2 status
pm2 list
pm2 logs backend --lines 50

# Nginx status
sudo systemctl status nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Health check
curl http://localhost/health
```

## 📁 Project Structure

```
my-react-app/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── FloatingChatbot.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── HeroCarousel.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── ProductPage.jsx
│   │   │   ├── AdminPage.jsx
│   │   │   ├── user/     # User dashboard pages
│   │   │   └── admin/    # Admin dashboard pages
│   │   ├── layouts/       # Layout components
│   │   ├── context/       # React context (AuthContext)
│   │   └── styles/        # Global styles
│   ├── public/           # Static assets
│   └── package.json
├── backend/              # Node.js Express backend
│   ├── controllers/     # Route controllers
│   │   ├── authController.js
│   │   ├── productsController.js
│   │   ├── ordersController.js
│   │   └── promoCodesController.js
│   ├── middleware/      # Express middleware
│   │   ├── auth.js
│   │   ├── admin.js
│   │   └── rateLimiter.js
│   ├── services/        # Business logic & external services
│   │   ├── airtableUserService.js
│   │   ├── airtableProductService.js
│   │   ├── airtableOrderService.js
│   │   ├── airtablePromoCodeService.js
│   │   └── emailService.js
│   ├── server.js        # Express app entry point
│   └── package.json
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions deployment workflow
├── nginx.conf           # Nginx configuration for reverse proxy
├── ecosystem.config.cjs # PM2 process manager configuration
├── scripts/            # Deployment and setup scripts
│   ├── manual-deploy.sh
└── README.md
```

## 🔧 Features

### User Features
- User registration and email verification
- JWT-based authentication
- Product browsing and purchasing
- Manual payment via bKash, Nagad, Rocket, or Bank Transfer
- User dashboard (purchases, transactions)
- Password reset functionality
- AI-powered chatbot (Groq API)

### Admin Features
- Admin dashboard
- Product management via Airtable CMS
- Promo code management
- User management
- Transaction monitoring
- Analytics and indicators

### Technical Features
- Rate limiting for API endpoints
- Email notifications
- Secure password hashing
- Protected routes
- Responsive design (Tailwind CSS)
- SEO-friendly structure

## 🐛 Troubleshooting

### Deployment Issues
1. **Build errors** - Check if all dependencies are properly installed
2. **Nginx 502 error** - Verify backend is running: `pm2 list`
3. **Port conflicts** - Ensure ports 80 and 4242 are available

### Common Issues
- **Environment variables not working** - Check .env files are properly configured
- **Stripe webhook errors** - Verify STRIPE_WEBHOOK_SECRET matches Stripe dashboard
- **Airtable connection issues** - Check AIRTABLE_PAT and base/table IDs
- **Email not sending** - Verify EMAIL_PASSWORD is an app password (not account password)

## 📝 API Documentation

See `API_DOCUMENTATION.md` for detailed API endpoints and usage examples.

## 📄 License

This project is private and confidential.