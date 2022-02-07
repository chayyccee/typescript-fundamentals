const prefix = '🐉 ';
import { productsURL } from '../lib';

type ProductType = {
        id: number;
        name: string;
        icon?: string; // means icon is an optional property
    };

export default async function updateOutputExample(id: string = 'output') {
    const products = await getProducts();
    const output = document.querySelector(`#${id}`);
    const html = layoutProducts(products);

    if (output && html) {
        output.innerHTML = html;
    }
}

function layoutProducts (products: ProductType[]) {
    const items = products.map((product) => {
        const productHtml = `
        <span class="card-id">#${product.id}</span>
          <i class="card-icon ${product.icon} fa-lg"></i>
        <span class="card-name">${product.name}</span>
        `;
        const cardHtml = `
        <li>
            <div class="card">
                <div class="card-content">
                    <div class="content">
                    ${productHtml} 
                    </div>
                </div>
            </div>
        </li>
        `;
        return cardHtml;
    });

    let productHtml = `<ul>${items.join('')}</ul>`;
    return productHtml;
}

async function getProducts (): Promise<ProductType[]> {
    const response: Response = await fetch(productsURL);
    const products: ProductType[] = await response.json();
    return products;
}

// run our samples
runTheLearningSamples();

function runTheLearningSamples() {
    // this function wll be hoisted when it is compiled
    function displayProductInfo(id: number, name: string) {
        // do something
        console.log(`${prefix} typed parameters`);
        console.log(`prodcut id=${id} and name=${name}`);
    }
    displayProductInfo(10, 'pizza');

    console.log(`${prefix} function declaration`);
    console.log(addNumbersDeclaration(7, 11));

    function addNumbersDeclaration(x: number, y: number): number {
        const sum: number = x + y;
        return sum;
    }

    const addNumbersExpression = function (x: number, y: number) {
        const sum: number = x + y;
        return sum;
    }

    console.log(`${prefix} function expression`);
    console.log(addNumbersExpression(77, 11));

    const sampleProducts = [
        {
            id: 10,
            name: 'Pizza Slice',
            icon: 'fas fa-pizza-slice',
        },
        {
            id: 20,
            name: 'Ice Cream',
            icon: 'fas fa-ice-cream',
        },
        {
            id: 30,
            name: 'Cheese',
            icon: 'fas fa-cheese',
        },
    ];

    function getProductNames(): string[] {
        return sampleProducts.map((product) => product.name);
    }

    console.log(`${prefix} return array`);
    console.log(getProductNames());

    function getProductById (id: number): ProductType | undefined {
        return sampleProducts.find((product) => product.id === id);
    }

    console.log(`${prefix} return ProductType`);
    console.log(getProductById(10));

    function displayProduct (products: ProductType[]): void {
        const productNames = products.map((product) => {
        const name = product.name.toLowerCase();
        return name;
        });
        const msg = `Sample products include: ${productNames.join(', ')}`;
        console.log(`${prefix} return void`);
        console.log(msg);
    }
    displayProduct(sampleProducts);

    /* const getRandomInt = (min: number, max: number): number => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    } */

    const getRandomInt = (max: number = 1000): number => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function createProduct (name: string, icon?: string): ProductType {
        const id = getRandomInt(100000);
        
        return { id, name, icon };
    }

    console.log(`${prefix} Optional parameters`);
    let pineapple = createProduct('pineapple', 'pine-apple.jpg');
    let mango = createProduct('mango');

    console.log(pineapple, mango);

    function createProductWithDefaults (name: string, icon: string = 'generic-fruit.jpg'): ProductType {
        const id = getRandomInt();
        
        return { id, name, icon };
    }

    console.log(`${prefix} Default parameters`);
    pineapple = createProductWithDefaults('pineapple', 'pine-apple.jpg');
    mango = createProductWithDefaults('mango');

    console.log(pineapple, mango);

    function buildAddress (street: string, city: string, ...restOfAddress: string[]) {
        const address = `${street}, ${city} ${restOfAddress.join(', ')}`;
        return address;
    }

    const someAddress = buildAddress(
        '123 Main St', // street
        'small ville', // city
        'NY', // rest arg [0]
        'CA', // rest arg [1]
        '90210', // rest arg [2]
        'Nigeria' // rest arg [3]
    );

    console.log(`${prefix} Rest parameters`);
    console.log(someAddress);

    function displayyProduct ({id, name}: ProductType): void {
        const nameL = name.toLowerCase();
        console.log(`${prefix} Destructuring parameters`);
        console.log(`product id=${id} and name=${nameL}`);
    }
    const prod = getProductById(10);
    if (prod) {
        displayyProduct(prod);
    }
}