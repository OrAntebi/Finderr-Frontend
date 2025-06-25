// export function UserGigList() {
//     const orders = useSelector(state => state.orderModule.orders)
//     const loggedUser = useSelector(storeState => storeState.userModule.user)

//     const sortedUserGigs = orders
//         .filter(order => order.seller._id === loggedUser._id)
//         .sort((a, b) => b.createdAt - a.createdAt)

//     const [isLoading, setIsLoading] = useState(true)

//     useEffect(() => {
//         setIsLoading(true)
//         loadOrders()
//             .finally(() => setIsLoading(false))
//     }, [])

//     if (isLoading) return <Loader />
//     console.log('sortedUserGigs', sortedUserGigs)
//     return (
//         <section className="user-gigs-list">
//             <h2>Your Gigs</h2>
//             <ul>
//                 {sortedUserGigs.map((gig) => (
//                     <li key={gig._id}>
//                         <h3>{gig.title}</h3>
//                         <p>{gig.description}</p>
//                         <p>Price: ${gig.price}</p>
//                     </li>
//                 ))}
//             </ul>
//         </section>
//     )
// }

export function UserGigList({ gigs }) {
  return (
    <table className="gig-list-editable">
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {gigs.map(gig => (
          <tr key={gig._id}>
            <td>{gig.title}</td>
            <td>${gig.price}</td>
            <td>
              <button onClick={() => onEditGig(gig)}>Edit</button>
              <button onClick={() => onRemoveGig(gig._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}