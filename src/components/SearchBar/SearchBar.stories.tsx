import { Meta, StoryObj } from '@storybook/react';
import SearchBar from './SearchBar';

const meta = {
    title: 'Components/SearchBar',
    component: SearchBar,
    tags: ['autodocs'],
} as Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        setSearchTerm: () => {
            console.log('Search query changed');
        },
        placeholder: 'Search for parts',
    },
};

export const Secondary: Story = {
    args: {
        setSearchTerm: () => {
            console.log('Search query changed');
        },
        placeholder: 'Search for parts',
        searchTerm: 'Part 1',
    },
};
