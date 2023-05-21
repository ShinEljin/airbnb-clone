import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listings/ListingCard";
import getCurrentUser from "@/utils/getCurrentUser";
import getListings, { IListingsParams } from "@/utils/getListings";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams ? searchParams : {});
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div
        className="pt-24 grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3
            xl:grid-cols-4
            2xl:grid-cols-5
            3xl:grid-cols-6
            gap-6
     "
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default Home;
