import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';
import { Button } from '../../../components/Button/SubmitButton';
import AdminSearchCard from '../../../components/admin/AdminSearchCard';
import SearchBar from '../../../components/searchBar/SearchBar';
import { Vendor } from '../../../services/apiTypes';
import { useGetVendors } from '../../../services/hooks/Vendor/useGetVendors';
import { SearchType } from '../../../utils/constant';
import { AdminContainer, ButtonContainer, SearchResultContainer } from '../styles';

const Vendors = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { data: initialData } = useGetVendors();
    const [filteredData, setFilteredData] = useState<Vendor[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (initialData) {
            setFilteredData(
                initialData.filter((vendor) =>
                    vendor.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                )
            );
        }
    }, [initialData, debouncedSearchTerm]);

    return (
        <AdminContainer>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="Search for vendor"
            />
            <SearchResultContainer>
                {filteredData?.map((vendor, i) => (
                    <div id={i === filteredData.length - 1 ? 'lastItem' : ''} key={vendor.id}>
                        <AdminSearchCard searchType={SearchType.Vendor} data={vendor} />
                    </div>
                ))}
            </SearchResultContainer>
            <ButtonContainer>
                <Button
                    onClick={() => navigate('/admin/add-vendor')}
                    children={'Add new vendor'}
                    backgroundColor={'black'}
                    color={'white'}
                />
            </ButtonContainer>
        </AdminContainer>
    );
};

export default Vendors;
