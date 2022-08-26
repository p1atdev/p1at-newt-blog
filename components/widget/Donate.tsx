interface Plan {
    title: string
    url: string
}

const plans: Plan[] = [
    {
        title: "支援 ¥100/月 プラン",
        url: "https://buy.stripe.com/dR65klbNGgmIeKQ7ss",
    },
    {
        title: "支援 三ツ矢サイダー(¥120) プラン",
        url: "https://buy.stripe.com/9AQ4ghaJC4E0auAaEH",
    },
    {
        title: "支援 ¥300 プラン",
        url: "https://buy.stripe.com/8wM9AB4le3zWfOU8wx",
    },
    {
        title: "支援 ¥1000/月 プラン",
        url: "https://buy.stripe.com/5kAdQRbNGc6scCI8wA",
    },
]

const Donate = () => {
    return (
        <div>
            {plans.map((plan) => (
                <div key={plan.url} className="my-3">
                    <a href={plan.url} target="__blank">
                        <p className="rounded-md bg-indigo-100 py-1 px-2 text-indigo-800 transition-all duration-150 hover:bg-indigo-200  hover:ring">
                            {plan.title}
                        </p>
                    </a>
                </div>
            ))}
            <div className="text-right text-gray-500">by Stripe</div>
        </div>
    )
}

export default Donate
