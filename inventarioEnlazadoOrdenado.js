class Item{
    constructor(code, product, quantity, cost){
        this.code = code;
        this.product = product;
        this.quantity = quantity;
        this.cost = cost;
        this.value = quantity * cost;
        this.next = null;
        this.prev = null;
    }

    getCode(){
        return this.code;
    }

    getProduct(){
        return this.product;
    }

    getQuantity(){
        return this.quantity;
    }

    getCost(){
        return this.cost;
    }

    getValue(){
        return this.value;
    }

    getNext(){
        return this.next;
    }

    getPrev(){
        return this.prev;
    }

    info(){
        return `<div>
        <h3>ID:${this.code}</h3>
        <p>Nombre:${this.product} Cantidad:${this.quantity} Costo:${this.cost} Valor:${this.value} </p>
        </div>`;
    }
}

class Storage{
    constructor(){
        this.start = null;
        this.lenght = 0;
    }

    add(item){
        if(this.start==null){
            this.start = item;
            this.lenght++;
        } else {
            this._find(item, this.start);
        }
    }

    _find(newest, old){
        if(old.code>newest.code){
            this.lenght++;
            this._add(newest, old);
        } else if(old.next == null){
            this.lenght++;
            this._addLast(newest, old);
        } else {
            this._find(newest, old.getNext());
        }
    }

    verificar(){
        if(this.start==null){
            return true;
        } else {
            return false;
        }
    }

    over(){
        if(this.lenght >=20){
            return true;
        } else {
            return false;
        }
    }

    _add(newest, old){
        if(this.start==old){
            this.start.prev = newest;
            newest.next = this.start;
            this.start = newest;
        } else {
            newest.next = old;
            newest.prev = old.prev
            old.prev.next = newest;
            old.prev = newest;
        }
    }

    _addLast(newest, old){
        newest.prev = old;
        old.next = newest;
    }

    delete(code){
        let holder = null;
        if(this.start.code == code && this.start.next == null){
            holder = this.start;
            this.start = null;
            return holder;
        }else if(this.start.code==code){
            holder = this.start;
            this.start = holder.next;
            holder.next = null;
            this.start.prev = null;
            this.lenght--;
            return holder;
        } else {
            holder = this._delete(code, this.start.next);
            this.lenght--;
            return holder;
        }
    }

    _delete(code, obj){
        if(code==obj.code  && obj.next == null){
           obj.prev.next = null;
           obj.prev = null;
           return obj; 
        } else if(code==obj.code){
            obj.prev.next = obj.next;
            obj.next.prev = obj.prev;
            obj.prev = null;
            obj.next = null;
            return obj;
        } else if(this._stop(code, obj)){
            return null;
        } else {
            this._delete(code, obj.next);
        }
    }

    search(code){
        if(this.start.code==code){
            return this.start;
        } else {
            return this._search(code, this.start.next);
        }
    }

    _search(code, obj){
        if(obj.code == code){
            return obj;
        } else if(this._stop(code, obj) || obj== null){
            return null;
        } else {
            return this._search(code, obj.next);
        }
    }

    _stop(code, obj){
        if(obj.code>code){
            return true;
        } else {
            return false;
        }
    }
    list(){
        let data = "";
        let temp = this.start;
        while(temp!=null){
            data = `${data} \n ${temp.info()}`;
            temp = temp.next;
        }
        return data;
    }

    reverseList(){
        let data = "";
        let temp = this.start;
        while(temp!=null){
            data = `${temp.info()} ${data}`;
            temp = temp.next;
        }
        return data;
    }
}

let almacen = new Storage();
let btnAdd=document.getElementById(`btnAdd`);
btnAdd.addEventListener(`click`, ()=>{
    let code = parseInt(document.getElementById(`txtCode`).value);
    let name = document.getElementById(`txtProduct`).value;
    let quantity = parseInt(document.getElementById(`txtQuantity`).value);
    let cost = parseInt(document.getElementById(`txtCost`).value);
    if(almacen.over()){
        document.getElementById(`details`).innerHTML+=`<p>El almacén está lleno</p>`
    } else if(code==NaN || name=="" || quantity==NaN || cost==NaN){
        document.getElementById(`details`).innerHTML+=`<p>Todos los campos son requeridos </p>`
    } else { 
    let producto=new Item(code, name, quantity, cost);
    almacen.add(producto);
    document.getElementById(`details`).innerHTML += `<p>Se agregó
     el objeto ${producto.getCode()} correctamente</p>`;
    }
})

let btnList=document.getElementById(`btnList`);
btnList.addEventListener(`click`, ()=>{
    let details = document.getElementById(`details`);
    if(almacen.verificar()){
        details.innerHTML+=`<p>No hay objetos</p>`
    } else {
        details.innerHTML+=`<p> ${almacen.list()} </p>`;
    }
})

let btnListInv=document.getElementById(`btnListInv`);
btnListInv.addEventListener(`click`, ()=>{
    let details = document.getElementById(`details`);
    if(almacen.verificar()){
        details.innerHTML+=`<p>No hay objetos</p>`
    } else {
        details.innerHTML+=`<p> ${almacen.reverseList()} </p>`;
    }
})

let btnSearch=document.getElementById(`btnSearch`);
btnSearch.addEventListener(`click`, ()=>{
    let code = document.getElementById(`txtCode`).value;
    let details= document.getElementById(`details`);
    if(code == ""){
        details.innerHTML+=`<p>No incertaste un código</p>`;
    } else{
        let sear=almacen.search(code);
        if(sear==null){
           details.innerHTML+=`<p>No se encontró</p>`;
        } else {
         details.innerHTML+= sear.info();
        }
    }
})

let btnDelete=document.getElementById(`btnDelete`);
btnDelete.addEventListener(`click`, ()=>{
    let code = document.getElementById(`txtCode`).value;
    let details= document.getElementById(`details`);
    let searching = almacen.delete(code);
    if(code == ""){
        details.innerHTML+=`<p>No incertaste un código</p>`;
    } else{
        if(searching==null){
            details.innerHTML+=`<p>No se encontró</p>`;
        } else {
            details.innerHTML+= searching.info();
        }
    }
})
