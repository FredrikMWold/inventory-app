import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'
import { Button } from '../../../components/Button/SubmitButton'
import AdminSearchCard from '../../../components/admin/AdminSearchCard'
import SearchBar from '../../../components/searchBar/SearchBar'
import { Location } from '../../../services/apiTypes'
import { useGetLocations } from '../../../services/hooks/Locations/useGetLocations'
import { SearchType } from '../../../utils/constant'
import { AdminContainer, ButtonContainer, SearchResultContainer } from '../styles'

const Locations = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const { data: initialData } = useGetLocations()
    const [filteredData, setFilteredData] = useState<Location[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        if (initialData) {
            setFilteredData(
                initialData.filter((location) =>
                    location.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                )
            )
        }
    }, [initialData, debouncedSearchTerm])

    return (
        <AdminContainer>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="Search for location"
            />
            <SearchResultContainer>
                {filteredData?.map((location, i) => (
                    <div id={i === filteredData.length - 1 ? 'lastItem' : ''}>
                        <AdminSearchCard searchType={SearchType.Location} data={location} />
                    </div>
                ))}
            </SearchResultContainer>
            <ButtonContainer>
                <Button
                    onClick={() => navigate('/admin/add-location')}
                    children={'Add new location'}
                    backgroundColor={'black'}
                    color={'white'}
                />
            </ButtonContainer>
        </AdminContainer>
    )
}

export default Locations
