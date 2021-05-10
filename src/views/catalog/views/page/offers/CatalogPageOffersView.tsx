import { FC } from 'react';
import { useCatalogContext } from '../../../context/CatalogContext';
import { CatalogPageOfferView } from '../offer/CatalogPageOfferView';
import { CatalogPageOffersViewProps } from './CatalogPageOffersView.types';

export const CatalogPageOffersView: FC<CatalogPageOffersViewProps> = props =>
{
    const { offers = [] } = props;
    const { catalogState } = useCatalogContext();
    const { activeOffer = null } = catalogState;

    return (
        <div className="row row-cols-5 align-content-start g-0 mb-n1 w-100 catalog-offers-container">
            { offers && (offers.length > 0) && offers.map((offer, index) =>
                {
                    return <CatalogPageOfferView key={ index } isActive={ (activeOffer === offer) } offer={ offer } />
                }) }
        </div>
    );
}
