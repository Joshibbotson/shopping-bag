export default function intToCurrency(num: number) {
    const formatter = new Intl.NumberFormat("en-UK", {
        style: "currency",
        currency: "GBP",
    })

    return formatter.format(num)
}
