const data = () => {
  let a = 4
  let b = 8
  let c = a * b
  return [a, b, c]
}

const [z, x, c] = data()
console.log(z, x, c)
