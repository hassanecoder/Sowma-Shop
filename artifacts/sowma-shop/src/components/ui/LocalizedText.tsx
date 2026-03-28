import { useTranslation } from '@/lib/i18n';

interface LocalizedEntity {
  name?: string;
  nameAr?: string;
  nameFr?: string;
  description?: string;
  descriptionAr?: string;
  descriptionFr?: string;
  [key: string]: any;
}

export function getLocalizedField(entity: LocalizedEntity, field: 'name' | 'description', lang: 'en'|'fr'|'ar') {
  if (!entity) return '';
  if (lang === 'ar') return entity[`${field}Ar`] || entity[field] || '';
  if (lang === 'fr') return entity[`${field}Fr`] || entity[field] || '';
  return entity[field] || '';
}

export function LocalizedName({ entity }: { entity: LocalizedEntity }) {
  const { lang } = useTranslation();
  return <>{getLocalizedField(entity, 'name', lang)}</>;
}

export function LocalizedDescription({ entity }: { entity: LocalizedEntity }) {
  const { lang } = useTranslation();
  return <>{getLocalizedField(entity, 'description', lang)}</>;
}
