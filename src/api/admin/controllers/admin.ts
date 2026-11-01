import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::admin.admin', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity = await strapi.documents('api::admin.admin').findFirst({
        populate: ['products', 'categories', 'campaigns', 'content', 'settings', 'orders', 'inquiries', 'coupons']
      });
      return { data: entity };
    } catch (err: any) {
      strapi.log.error('Admin find error:', err);
      return ctx.internalServerError(err.message || 'Failed to fetch admin workspace');
    }
  },

  async update(ctx) {
    try {
      const { data } = ctx.request.body || {};
      if (!data) {
        return ctx.badRequest('Missing data');
      }

      const existing = await strapi.documents('api::admin.admin').findFirst({
        populate: ['products', 'categories', 'campaigns', 'content', 'settings', 'orders', 'inquiries', 'coupons']
      });

      let mergedData: Record<string, any> = {};
      if (existing) {
        if (data.products !== undefined) {
          mergedData.products = Array.isArray(data.products)
            ? data.products.map(({ id, ...rest }: any) => rest)
            : data.products;
        } else if (existing.products) {
          mergedData.products = (existing.products as any[]).map(({ id, ...rest }: any) => rest);
        }

        if (data.categories !== undefined) {
          mergedData.categories = Array.isArray(data.categories)
            ? data.categories.map(({ id, ...rest }: any) => rest)
            : data.categories;
        } else if (existing.categories) {
          mergedData.categories = (existing.categories as any[]).map(({ id, ...rest }: any) => rest);
        }

        if (data.campaigns !== undefined) {
          mergedData.campaigns = Array.isArray(data.campaigns)
            ? data.campaigns.map(({ id, ...rest }: any) => rest)
            : data.campaigns;
        } else if (existing.campaigns) {
          mergedData.campaigns = (existing.campaigns as any[]).map(({ id, ...rest }: any) => rest);
        }

        if (data.content !== undefined) {
          if (data.content && typeof data.content === 'object') {
            const { id, ...rest } = data.content as any;
            mergedData.content = rest;
          } else {
            mergedData.content = data.content;
          }
        } else if (existing.content) {
          const { id, ...rest } = existing.content as any;
          mergedData.content = rest;
        }

        if (data.settings !== undefined) {
          if (data.settings && typeof data.settings === 'object') {
            const { id, ...rest } = data.settings as any;
            mergedData.settings = rest;
          } else {
            mergedData.settings = data.settings;
          }
        } else if (existing.settings) {
          const { id, ...rest } = existing.settings as any;
          mergedData.settings = rest;
        }

        if (data.orders !== undefined) {
          mergedData.orders = Array.isArray(data.orders)
            ? data.orders.map(({ id, ...rest }: any) => rest)
            : data.orders;
        } else if (existing.orders) {
          mergedData.orders = (existing.orders as any[]).map(({ id, ...rest }: any) => rest);
        }

        if (data.inquiries !== undefined) {
          mergedData.inquiries = Array.isArray(data.inquiries)
            ? data.inquiries.map(({ id, ...rest }: any) => rest)
            : data.inquiries;
        } else if (existing.inquiries) {
          mergedData.inquiries = (existing.inquiries as any[]).map(({ id, ...rest }: any) => rest);
        }

        if (data.coupons !== undefined) {
          mergedData.coupons = Array.isArray(data.coupons)
            ? data.coupons.map(({ id, ...rest }: any) => rest)
            : data.coupons;
        } else if ((existing as any).coupons) {
          mergedData.coupons = ((existing as any).coupons as any[]).map(({ id, ...rest }: any) => rest);
        }
      } else {
        mergedData = data;
      }

      let result;
      if (existing) {
        result = await strapi.documents('api::admin.admin').update({
          documentId: existing.documentId,
          data: mergedData,
          populate: ['products', 'categories', 'campaigns', 'content', 'settings', 'orders', 'inquiries', 'coupons']
        });
      } else {
        result = await strapi.documents('api::admin.admin').create({
          data: mergedData,
          populate: ['products', 'categories', 'campaigns', 'content', 'settings', 'orders', 'inquiries', 'coupons']
        });
      }

      return { data: result };
    } catch (err: any) {
      strapi.log.error('Admin update error:', err);
      return ctx.internalServerError(err.message || 'Failed to update admin workspace');
    }
  }
}));

