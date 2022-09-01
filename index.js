let fruits = [
{id:1,title:'Картина "Туман"',text:'<p>Сколько чудес за туманами кроется.</p><p>Ни подойти, ни увидеть, ни взять.</p><p>Дважды пытались, но бог любит троицу,</p>Ладно, придется ему подыграть.', price:137, img: '1.jpg'},
{id:2,title:'Картина "Море"',text:'<p>Белеет парус одинокой</p> <p>В тумане моря голубом!..</p><p>Что ищет он в стране далекой?</p>Что кинул он в краю родном?..', price:359, img: '2.jpg' },
{id:3,title:'Картина "Пруд"',text:'<p>Зелененькою ряскою Покрыта гладь пруда.</p><p>Под зыбкою замазкою Колышется вода…</p><p>У берега метелочки Густого тростника</p><p>А на бугре две елочки Сквозят издалека.</p>', price:124, img: '3.jpg' },
]
const toHTML = fruit => `
<div class="col">
<div class="card">
    <img class="card-img-top" style="height: 200px;" src="${fruit.img}" alt="${fruit.title}">
    <div class="card-body">
      <h5 class="card-title">${fruit.title}</h5>
      <p class="card-text">${fruit.text}</p>
      <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
      <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
    </div>
  </div>
</div>
`
function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
} 

render()
const pricemodal = $.modal( {
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {text:'Закрыть', type: 'primary', handler() {
            pricemodal.close()
        }}
    ]
} )

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)

if (btnType === 'price') {
    pricemodal.setContent(`
     <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
       `)
       pricemodal.open()  
    } else if (btnType === 'remove') {
        $.confirm(  {
            title: 'Вы уверены?',
            content: `<p>Вы удаляете из списка:<strong>${fruit.title}</strong></p>`
        }).then( () => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch( () =>{console.log('Cancel')
    })
    }
})