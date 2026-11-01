import type { Schema, Struct } from '@strapi/strapi';

export interface AdminCampaign extends Struct.ComponentSchema {
  collectionName: 'components_admin_campaigns';
  info: {
    displayName: 'Campaign';
    icon: 'bullhorn';
  };
  attributes: {
    area: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    goalAmount: Schema.Attribute.Decimal;
    image: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    raisedAmount: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    status: Schema.Attribute.Enumeration<['Active', 'Draft']> &
      Schema.Attribute.DefaultTo<'Active'>;
  };
}

export interface AdminCategory extends Struct.ComponentSchema {
  collectionName: 'components_admin_categories';
  info: {
    displayName: 'Category';
    icon: 'folder';
  };
  attributes: {
    description: Schema.Attribute.Text;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    slug: Schema.Attribute.String & Schema.Attribute.Required;
    subcategories: Schema.Attribute.Text;
  };
}

export interface AdminContent extends Struct.ComponentSchema {
  collectionName: 'components_admin_contents';
  info: {
    displayName: 'Content';
    icon: 'file';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heroSubtitle: Schema.Attribute.String;
    heroTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface AdminCoupon extends Struct.ComponentSchema {
  collectionName: 'components_admin_coupons';
  info: {
    description: 'Promo codes and discounts for Swachetna Foundation store';
    displayName: 'Coupon';
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.String;
    discountType: Schema.Attribute.Enumeration<['percentage', 'fixed']> &
      Schema.Attribute.DefaultTo<'percentage'>;
    discountValue: Schema.Attribute.Decimal & Schema.Attribute.Required;
    maxDiscount: Schema.Attribute.Decimal;
    minOrderAmount: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    status: Schema.Attribute.Enumeration<['Active', 'Inactive']> &
      Schema.Attribute.DefaultTo<'Active'>;
  };
}

export interface AdminInquiry extends Struct.ComponentSchema {
  collectionName: 'components_admin_inquiries';
  info: {
    description: 'User contact inquiries and messages';
    displayName: 'Inquiry';
    icon: 'mail';
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    message: Schema.Attribute.Text & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.String;
    status: Schema.Attribute.Enumeration<['New', 'Read', 'Responded']> &
      Schema.Attribute.DefaultTo<'New'>;
    subject: Schema.Attribute.String;
  };
}

export interface AdminOrder extends Struct.ComponentSchema {
  collectionName: 'components_admin_orders';
  info: {
    displayName: 'Order';
    icon: 'shopping-bag';
  };
  attributes: {
    customer: Schema.Attribute.String & Schema.Attribute.Required;
    customerAddress: Schema.Attribute.Text;
    customerEmail: Schema.Attribute.Email;
    customerPhone: Schema.Attribute.String;
    items: Schema.Attribute.JSON;
    orderDate: Schema.Attribute.DateTime;
    orderId: Schema.Attribute.String & Schema.Attribute.Required;
    paymentMethod: Schema.Attribute.String;
    status: Schema.Attribute.Enumeration<
      ['Pending', 'Processing', 'Shipped', 'Delivered']
    > &
      Schema.Attribute.DefaultTo<'Pending'>;
    total: Schema.Attribute.Decimal & Schema.Attribute.Required;
  };
}

export interface AdminProduct extends Struct.ComponentSchema {
  collectionName: 'components_admin_products';
  info: {
    displayName: 'Product';
    icon: 'shopping-cart';
  };
  attributes: {
    category: Schema.Attribute.String;
    colors: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Text;
    images: Schema.Attribute.Text;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    originalPrice: Schema.Attribute.Decimal;
    price: Schema.Attribute.Decimal & Schema.Attribute.Required;
    reviews: Schema.Attribute.JSON;
    sizes: Schema.Attribute.String;
    sku: Schema.Attribute.String;
    slug: Schema.Attribute.String & Schema.Attribute.Required;
    status: Schema.Attribute.Enumeration<['Published', 'Draft']> &
      Schema.Attribute.DefaultTo<'Published'>;
    stock: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    subcategory: Schema.Attribute.String;
    variants: Schema.Attribute.JSON;
  };
}

export interface AdminSettings extends Struct.ComponentSchema {
  collectionName: 'components_admin_settings';
  info: {
    displayName: 'Settings';
    icon: 'cog';
  };
  attributes: {
    address: Schema.Attribute.Text;
    email: Schema.Attribute.Email;
    organization: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    website: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'admin.campaign': AdminCampaign;
      'admin.category': AdminCategory;
      'admin.content': AdminContent;
      'admin.coupon': AdminCoupon;
      'admin.inquiry': AdminInquiry;
      'admin.order': AdminOrder;
      'admin.product': AdminProduct;
      'admin.settings': AdminSettings;
    }
  }
}
