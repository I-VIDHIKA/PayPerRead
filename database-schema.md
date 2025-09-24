# PayPerRead Database Schema

## Core Tables

### 1. Users Table
```sql
users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT, -- for email/password users
  name TEXT NOT NULL,
  wallet_address TEXT, -- for MetaMask users
  stripe_customer_id TEXT UNIQUE, -- Stripe customer ID
  wallet_balance DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)
```

### 2. Articles Table
```sql
articles (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  published_at TIMESTAMP NOT NULL,
  image_url TEXT,
  is_locked BOOLEAN DEFAULT true,
  price_inr DECIMAL(10,2) NOT NULL,
  price_eth DECIMAL(18,8) NOT NULL,
  category TEXT NOT NULL,
  stripe_price_id TEXT, -- Stripe Price ID for this article
  created_at TIMESTAMP DEFAULT NOW()
)
```

### 3. User Article Access Table
```sql
user_article_access (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP DEFAULT NOW(),
  payment_method TEXT CHECK (payment_method IN ('wallet', 'stripe', 'metamask')),
  amount_paid DECIMAL(10,2) NOT NULL,
  UNIQUE(user_id, article_id)
)
```

### 4. Wallet Transactions Table
```sql
wallet_transactions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  transaction_type TEXT CHECK (transaction_type IN ('topup', 'deduction', 'refund')),
  amount DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  stripe_payment_intent_id TEXT, -- for topups via Stripe
  article_id UUID REFERENCES articles(id), -- for article purchases
  created_at TIMESTAMP DEFAULT NOW()
)
```

### 5. Stripe Payments Table
```sql
stripe_payments (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'inr',
  status TEXT NOT NULL, -- succeeded, failed, pending, etc.
  payment_type TEXT CHECK (payment_type IN ('wallet_topup', 'article_purchase')),
  article_id UUID REFERENCES articles(id), -- null for wallet topups
  metadata JSONB, -- additional Stripe metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)
```

### 6. Subscriptions Table (Optional - for future premium plans)
```sql
subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  stripe_price_id TEXT NOT NULL,
  status TEXT NOT NULL, -- active, canceled, past_due, etc.
  current_period_start TIMESTAMP NOT NULL,
  current_period_end TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)
```

## Key Data Points to Store

### User Management
- **Basic Info**: Email, name, password hash
- **Wallet**: MetaMask address, internal wallet balance
- **Stripe**: Customer ID for payment processing
- **Authentication**: Support both email/password and wallet-based auth

### Article Management
- **Content**: Title, excerpt, full content, author, images
- **Pricing**: Both INR and ETH prices
- **Access Control**: Lock status, category classification
- **Stripe Integration**: Price IDs for payment processing

### Payment Tracking
- **Transaction History**: All wallet topups, deductions, refunds
- **Payment Methods**: Track whether payment was via wallet, Stripe, or MetaMask
- **Stripe Data**: Payment intent IDs, customer IDs, payment status
- **Access Records**: When users unlocked articles and how they paid

### Financial Records
- **Wallet Balance**: Real-time balance tracking
- **Transaction Logs**: Complete audit trail of all financial activities
- **Payment Status**: Success/failure tracking for all transactions
- **Revenue Analytics**: Track earnings per article, payment method preferences

## Security Considerations

### Sensitive Data
- **Never store**: Credit card numbers, CVV codes, full payment details
- **Hash passwords**: Use bcrypt or similar for email/password users
- **Encrypt**: Wallet addresses and sensitive user data
- **Audit logs**: Track all access and payment activities

### Stripe Integration
- **Store only**: Customer IDs, Payment Intent IDs, subscription IDs
- **Use webhooks**: For real-time payment status updates
- **Validate**: All payments server-side before granting access
- **Handle failures**: Graceful error handling and retry logic

## Indexes for Performance
```sql
-- User lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_stripe_customer ON users(stripe_customer_id);

-- Article access
CREATE INDEX idx_user_article_access_user ON user_article_access(user_id);
CREATE INDEX idx_user_article_access_article ON user_article_access(article_id);

-- Transaction history
CREATE INDEX idx_wallet_transactions_user ON wallet_transactions(user_id);
CREATE INDEX idx_wallet_transactions_created ON wallet_transactions(created_at);

-- Payment tracking
CREATE INDEX idx_stripe_payments_user ON stripe_payments(user_id);
CREATE INDEX idx_stripe_payments_intent ON stripe_payments(stripe_payment_intent_id);
```