"use client"
import React, { useEffect, useState } from 'react'
import logo from '@/images/logo.jpg'
import Link from 'next/link';
import { ChevronDown,Search} from 'lucide-react';
import { Input } from './ui/input';
import LoginBtn from './LoginBtn';
import CartBtn from './CartBtn';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { useSession } from 'next-auth/react';

const Navbar = ({ products }) => {
    const router = useRouter();
    const session = useSession();
    // console.log(session);
    
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [categories, setCategories] = useState<string[]>([]);
    const [placeholder, setPlaceholder] = useState("Search");

    useEffect(() => {
        const uniqueCategories = Array.from(new Set(products.map((product) => product.category)));
        setCategories(uniqueCategories);
    }, [products]);

    useEffect(() => {
        if (searchTerm.length > 0) {
            setIsSearching(true);
            const results = products.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(results.slice(0, 5));
        } else {
            setIsSearching(false);
            setSearchResults([]);
        }
    }, [products, searchTerm]);

    // Changing Placeholder Logic
    useEffect(() => {
        let currentIndex = 0;

        const interval = setInterval(() => {
            setPlaceholder(`Search for ${` " ${categories[currentIndex]} "` || "Products"}`);
            currentIndex = (currentIndex + 1) % categories.length;
        }, 3000);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [categories]);


    return (
        <nav className="bg-white shadow sticky top-0 z-50">
            {/* for medium and large devices  */}
            <div className="container mx-auto px-4 flex justify-between items-center py-4">
                <div className="flex items-center space-x-6">
                    <Link href="/" className="flex-shrink-0">
                        <img
                            src={logo.src}
                            alt="logo"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    </Link>
                    <div className="relative group">
                        <div
                            
                            className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium inline-flex items-center"
                        >
                            Categories <ChevronDown className="ml-1 h-4 w-4" />
                        </div>
                        <div className="absolute left-0 mt-2 w-48 z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                            <div
                                className="py-1"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                            >
                                {categories.map((category) => (
                                    <Link
                                        key={category}
                                        href={`/category/${category
                                            .toLowerCase()
                                            .replace(" & ", "-")}`}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        role="menuitem"
                                    >
                                        {category}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:block">
                    <div className="flex items-center">
                        <form onSubmit={(e: React.FormEvent) => { e.preventDefault() }} className="mr-4 relative">
                            <div className="relative">
                                <Input
                                    type="search"
                                    placeholder={placeholder}
                                    className="w-96 pl-10 border border-gray-300 rounded-md focus:ring-primary focus:border-primary-foreground"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    size={18}
                                />
                            </div>
                            {isSearching && (
                                <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg z-10">
                                    {searchResults.length > 0 ? (
                                        searchResults.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={`/products/${product.id}`}
                                                className="flex items-center px-4 py-2 hover:bg-gray-100"
                                                onClick={() => setSearchTerm("")}
                                            >
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-md mr-3"
                                                />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {product.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        ₹{product.price.toFixed(2)}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="px-4 py-2 text-sm text-gray-700">
                                            No results found
                                        </div>
                                    )}
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <LoginBtn />
                    {
                        session.status == "authenticated" ?
                            ""
                            :
                            <Button onClick={() => router.push('/signup')}>
                                Sign UP
                            </Button>
                    }
                    <CartBtn />
                </div>
            </div>

            {/* for mobile device menu */}
        </nav>
    )
}

export default Navbar;
