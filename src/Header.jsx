import React from 'react';

const Header = () => {
    return (
        <header className="text-center my-5">
            <h1 className="text-3xl font-bold">1C3B00DA ~</h1>
            <hr className="border-0 h-px bg-gray-300 my-2" />
            <div className="font-mono text-lg text-gray-600">
                <span className="mx-2">cd ~</span>
                <span className="mx-2">uname -a</span>
                <span className="mx-2">ls -al post</span>
            </div>
        </header>
    );
};

export default Header;
