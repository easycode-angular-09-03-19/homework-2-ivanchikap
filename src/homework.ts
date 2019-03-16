// ***************** Этот файл можно удалить если он вам не подходит или не нужен. ***************** 
// *************************************************************************************************

// 1. Создать декоратор метода addItemInfoDecorator он должен добавлять поле date в возвращаемом объекте с датой когда был вызван метод а также поле info в котором будет записан текст состоящий из названия товара и его цены например: ‘Apple iPhone - $100’;
// Для того что бы функция была вызвана в правильном контексте внутри декоратора ее нужно вызывать через apply let origResult =  originalFunc.apply(this);


function addItemInfoDecorator(target: Object, method: string, descriptor: PropertyDescriptor) {

    let originGetItemInfo = descriptor.value;
    descriptor.value = function () {
        const resultOriginGetItemInfo = originGetItemInfo.apply(this);

        const nameRes: string = resultOriginGetItemInfo.name;
        const priceRes: number = resultOriginGetItemInfo.price;
        return {
            date: new Date,
            info: `${nameRes} - $${priceRes}`
        }
    }
}

class Item {
    public price: number;
    public name: string;

    constructor(name: string ,price: number) {
        this.name = name;
        this.price = price;
    }

    @addItemInfoDecorator
    public getItemInfo() {
        return {
            name: this.name,
            price: this.price
        };
    }
}

let item = new Item('Apple', 100);
console.log(item.getItemInfo());

// 2. Создать декоратор класса User. Он должен добавлять в данном классе поле createDate датой создания класса а также добавлять поле type в котором будет записана строка ‘admin’ или ‘user’ данную строку нужно передать в декоратор при вызове. Сам класс и имя декоратора может быть произвольным.

function DecorateUser(userType: string) {
    return function (targetClass) {
        return class {
            public createDate: Date = new Date;
            public type: string = userType;
        }
    }
}
@DecorateUser('user')
class User {

}

const user = new User();
console.log(user);

// 3. Есть два апи для получения и работы с новостями одно для получения новостей из USA второе из Ukraine. Под эти апи создано по два интерфейса и по два класса. Переделайте это в namespaces.

// News api USA
namespace USA {
    export interface INews {
        id: number;
        title: string;
        text: string;
        author: string;
    }
    export class NewsService {
        protected apiurl: string = 'https://news_api_usa_url';
        public getNews() {} // method
    }
}

// News api Ukraine
namespace Ukraine {
    export interface INews {
        uuid: string;
        title: string;
        body: string;
        author: string;
        date: string;
        imgUrl: string;
    }

    export class NewsService {
        protected apiurl: string = 'https://news_api_2_url';
        public getNews() {} // method get all news
        public addToFavorite() {} // method add to favorites
    }
}

// const newsServiceUSA: USA.INews = new USA.NewsService();
// const newsServiceUkraine: Ukraine.INews = new Ukraine.NewsService();

// 4. Есть два класса Junior и Middle создайте класс Senior который будет имплементировать этих два класса а также у него будет еще свой метод createArchitecture реализация данного метода может быть произвольной

class Junior {
    public html: string = 'index.html';
    public makeMarkup(): void {
        this.html = 'index.html is finished'
    };
}

class Middle {
    public js: string = 'main.js';
    public writeCode(): void {
        this.js = 'main.js is finished'
    }
}

class Senior implements Junior, Middle{
    public html: string = 'index.html';
    public makeMarkup(): void {};
    public js: string = 'main.js';
    public writeCode(): void {};
    public createArchitecture(): string {
        return 'I checked your work and have created Architecture'
    }
}

function applyMixins(targetClass, baseClass) {
    baseClass.forEach((baseClass) => {
        Object.getOwnPropertyNames(baseClass.prototype).forEach((propertyName) => {
            targetClass.prototype[propertyName] = baseClass.prototype[propertyName];
        });
    });
}

applyMixins(Senior, [Junior, Middle]);
const senior = new Senior();
