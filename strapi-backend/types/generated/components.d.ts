import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_feature_items';
  info: {
    displayName: 'Feature Item';
  };
  attributes: {
    description: Schema.Attribute.String;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlocksMediaItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_media_items';
  info: {
    displayName: 'Media_Item';
  };
  attributes: {
    description: Schema.Attribute.String;
    file: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['image', 'video']>;
  };
}

export interface BlocksProcessStep extends Struct.ComponentSchema {
  collectionName: 'components_blocks_process_steps';
  info: {
    displayName: 'Process step';
  };
  attributes: {
    description: Schema.Attribute.String;
    stepNumber: Schema.Attribute.String;
    tags: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
    Variant: Schema.Attribute.Enumeration<['primary', 'secondary', 'outline']>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
  };
  attributes: {
    metaDescription: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String;
    shareImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.feature-item': BlocksFeatureItem;
      'blocks.media-item': BlocksMediaItem;
      'blocks.process-step': BlocksProcessStep;
      'shared.button': SharedButton;
      'shared.seo': SharedSeo;
    }
  }
}
