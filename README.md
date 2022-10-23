# goit-react-hw-03-phonebook

Робота є копією [попереднього завдання](https://github.com/syniepolskyi/goit-react-hw-02-phonebook)

## LocalStorage

Під час додавання та видалення контакту контакти зберігаються у локальне сховище. Використовується в App метод `componentDidUpdate(prevProps, prevState)`.

Під час завантаження застосунку контакти, якщо такі є, зчитуються з локального сховища і записуються у стан. Використовується в App метод `componentDidMount()`.