# Airtable Setup Guide for Mobile Package Selling App

## 📋 REQUIRED AIRTABLE TABLES

Since you're using frontend data for products, you only need these 2 tables:

---

## 1. 📦 Orders Table

### Table ID: `tblP1NkNZn7PB8cwO`

### Required Fields (Exact Field Names):

1. **Product ID** (Single Line Text)
   - Stores: Frontend product ID (e.g., "robi-60gb-1500min")

2. **Product Name** (Single Line Text)
   - Stores: Product name (e.g., "Robi 60GB + 1500 Min")

3. **Amount** (Currency)
   - Stores: Price in Taka (e.g., 925)
   - Format: Number with currency symbol

4. **Status** (Single Select)
   - Options: `pending`, `completed`, `refunded`, `failed`
   - Default: `pending`

5. **Payment Method** (Single Select)
   - Options: `bkash`, `nagad`, `rocket`, `bank`

6. **Payment ID** (Single Line Text)
   - Stores: Transaction ID or phone number (e.g., "01714042230")

7. **UserID** (Single Line Text)
   - Stores: Airtable User Record ID
   - Used: Link order to user account

8. **Customer Email** (Email)
   - Stores: Customer's email address
   - Normalized: Lowercase, dots removed for Gmail

9. **Customer Name** (Single Line Text)
   - Stores: Customer's name from their account

10. **Offer Number** (Single Line Text)
    - Stores: Phone number for package activation (e.g., "01712345678")

---

## 2. 👥 Users Table

### Required Fields:

1. **Email** (Email)
   - Primary field for user identification
   - Unique for each user

2. **Name** (Single Line Text)
   - User's full name

3. **Password** (Single Line Text)
   - Hashed password for authentication

4. **Role** (Single Select)
   - Options: `admin`, `user`
   - Default: `user`

5. **Is Verified** (Checkbox)
   - Default: false
   - Email verification status

6. **Verification Token** (Single Line Text)
   - Token for email verification

7. **Reset Password Token** (Single Line Text)
   - Token for password reset

8. **Reset Password Expires** (Date)
   - Expiration date for password reset token

9. **Created At** (Date)
   - User registration date

---

## ❌ NOT NEEDED: Products Table

You're using frontend data files for products:
- `frontend/src/data/products.js` (Robi, Airtel, Banglalink packages)
- `frontend/src/data/rarely_changed_products.js` (GP, Skitto, Ryze packages)

**Do NOT create a Products table in Airtable.** All product data is managed in the frontend.

---

## 🔧 HOW TO ADD FIELDS IN AIRTABLE:

### Step 1: Open Your Airtable Base
1. Go to: https://airtable.com/appfm19v1p5FXUzri/tblP1NkNZn7PB8cwO
2. Click the "+" button next to the last column header
3. A dialog will appear to create a new field

### Step 2: Add Each Field

For each field above:

1. **Field Name**: Type exactly as shown above (case-sensitive!)
2. **Field Type**: Select the correct type from dropdown
3. Click "Create Field"

### Step 3: For Single Select Fields

When creating Status, Payment Method, or Role fields:
1. Choose "Single Select" as field type
2. Add each option on a new line

---

## ✅ CHECKLIST - Verify Your Setup:

After adding all fields, your tables should look like:

### Orders Table:
| Product ID | Product Name | Amount | Status | Payment Method | Payment ID | UserID | Customer Email | Customer Name | Offer Number |
|------------|--------------|---------|---------|----------------|------------|---------|----------------|----------------|--------------|
| robi-60gb-1500min | Robi 60GB + 1500 Min | 925 | pending | bkash | 01714042230 | recxxx | user@email.com | John Doe | 01712345678 |

### Users Table:
| Email | Name | Password | Role | Is Verified | Created At |
|-------|------|----------|------|-------------|------------|
| admin@example.com | Admin Admin | [hashed] | admin | true | 2024-01-01 |

---

## 🧪 TEST YOUR SETUP:

1. Add all required fields to both tables
2. Go to your website: http://localhost:5173
3. Register a new account (creates User record)
4. Click "Buy Now" on any package
5. Complete the payment modal
6. Check Airtable for:
   - New order in Orders table
   - Order status: pending
   - All fields filled correctly

---

## ❌ COMMON ERRORS & SOLUTIONS:

### Error: "Field not found"
**Cause**: Field name doesn't match exactly
**Solution**: 
- Check field names are EXACTLY as shown above
- No extra spaces
- Correct capitalization (e.g., "Product ID" not "product id")

### Error: "Invalid type for field"
**Cause**: Wrong field type
**Solution**:
- Amount MUST be "Currency" type
- Status MUST be "Single Select" type
- Payment Method MUST be "Single Select" type

### Error: "Invalid select option"
**Cause**: Option doesn't exist in Single Select
**Solution**:
- Make sure all options are added to Status, Payment Method, and Role fields
- Check for typos in option names

---

## 📊 OPTIONAL FIELDS (Not Required):

### Orders Table:
- **Purchase Date** (Date + Time) - Separate from Airtable's createdTime
- **Notes** (Long Text) - Admin notes about the order

### Users Table:
- **Last Login** (Date + Time) - Track user activity
- **Phone Number** (Phone) - Contact information

---

## 🚀 AFTER SETUP:

Once fields are added:

1. **Restart your backend**:
   ```bash
   cd backend
   npm start
   ```

2. **Create admin account**:
   - Register a new user
   - Go to Airtable Users table
   - Change Role to "admin"
   - Set IsVerified to true

3. **Test the full flow**:
   - Login as admin
   - Check admin dashboard for orders
   - Logout and register as regular user
   - Buy a package
   - Check Airtable for new order

4. **Verify admin panel**:
   - Go to Admin Dashboard
   - You should see:
     - Orders with payment details
     - Users list
     - Transaction history

---

## 💡 TIPS:

- ✅ Use **exact** field names as shown (case-sensitive!)
- ✅ Set **Currency** field to Taka (৳)
- ✅ Add **ALL options** to Single Select fields
- ✅ Test with a small purchase first
- ✅ Keep tables open in browser while testing
- ✅ Create admin account by editing Airtable directly
- ✅ Verify email addresses work for password reset

---

## 🆘 STILL HAVING ISSUES?

Check your backend terminal for error logs:
```bash
cd backend
npm start
```

Look for errors like:
- `Airtable create order error:`
- `Field not found:`
- `Invalid type for field:`
- `User creation error:`

Share the error message and I can help fix it!