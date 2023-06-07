import React, { FC } from 'react';
import Link from 'next/link';

interface MenuInterface {
    arrayMenuOptions:{
        name:string,
        link:string
    }[]
}
const Menu: FC<MenuInterface> = ({arrayMenuOptions}) => {
    return arrayMenuOptions.length > 0 ? <nav>
        <ul>
            <li>
                <h1>Stripe notes code</h1>
            </li>
            {arrayMenuOptions.map((data,key) => <li key={key}>
                <Link href={data.link}>{data.name}</Link>
            </li>)}
        </ul>
    </nav> : null
}

export default Menu;