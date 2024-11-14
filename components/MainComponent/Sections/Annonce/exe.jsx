return (
  <div className="container mx-auto py-10 h-[680px]">
    <div className="flex justify-between mb-8">
      <motion.h1
        className="text-[30px]"
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          hidden: { opacity: 0, x: -50, transition: { duration: 0.5 } },
        }}
      >
        Trouvez des locations adaptées à vos besoins.
      </motion.h1>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          hidden: { opacity: 0, x: 50, transition: { duration: 0.5 } },
        }}
      >
        <Link href="/Annonces">
          <Button className="h-[45px] w-[137px] text-[18px] rounded-[10px]">
            Voir plus
            <FaArrowRight className="ml-2" />
          </Button>
        </Link>
      </motion.div>
    </div>

    <Carousel className="w-full max-w-5xl mx-auto">
      <CarouselContent>
        {loading ? (
          <CarouselItem>
            <p>Chargement des annonces...</p>
          </CarouselItem>
        ) : annonces.length === 0 ? (
          <CarouselItem>
            <p>Aucune annonce trouvée.</p>
          </CarouselItem>
        ) : (
          annonces.slice(0, 4).map((annonce, i) => (
            <CarouselItem
              key={annonce.id}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <motion.div
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={controls}
              >
                <Card className="w-full overflow-hidden">
                  <div className="relative">
                    {annonce.imageAnnonces.length > 0 && (
                      <Image
                        src={annonce.imageAnnonces[0].path}
                        alt={annonce.titre}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <button
                      onClick={() => toggleHeart(annonce.id)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                    >
                      {likedAnnonces.includes(annonce.id) ? (
                        <AiFillHeart size={28} color="#FC1111" />
                      ) : (
                        <AiOutlineHeart size={28} color="#FC1111" />
                      )}
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">
                      {annonce.categorieAnnonce}
                    </div>
                    <h2 className="text-lg font-semibold mb-1">
                      {annonce.titre}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-2">
                      {annonce.user.nom} {annonce.user.prenom}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <Button asChild>
                      <Link href={`/Annonces/id=${annonce.id}`}>Details</Link>
                    </Button>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4"
                          fill={
                            i < Math.round(annonce.averageNote)
                              ? "gold"
                              : "none"
                          }
                          stroke="gold"
                          strokeWidth="1.5"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          />
                        </svg>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            </CarouselItem>
          ))
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      pauseOnFocusLoss
      theme="light"
    />
  </div>
);
