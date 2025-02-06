import {Card, Col, Image, Panel, Row, Text, VStack} from "rsuite";
import {useNewsApi} from "../../hooks/useNewsApi.ts";
import {useCallback, useRef} from "react";
import placeholderImage from "../../assets/placeholder.png"

const News = () => {
    const {data, fetchNextPage, hasNextPage, isFetching, isPending} = useNewsApi();

    const allPosts = data?.pages.flatMap((page) => page.data) ?? [];
    const [featuredPost, ...rest] = allPosts;
    const popularPosts = rest.slice(0, 3);
    const newPosts = rest.slice(3);

    const observer = useRef<IntersectionObserver | null>(null);

    const lastElement = useCallback((node: HTMLDivElement) => {
        if (isFetching) return;
        if (observer.current) observer.current?.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage().then(r => console.log(r));
            }
        }, {rootMargin: '100px', threshold: 0.1});

        if (node) observer.current?.observe(node)
    }, [isFetching, hasNextPage, fetchNextPage]);

    if (isPending) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: '80vh'}}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <>
            <Row style={{paddingBottom: '10px'}}>
                <Col sm={12}>
                    <Panel
                        header="Featured Posts"
                        style={{
                            background: "var(--rs-body)",
                        }}
                    >
                        {featuredPost && (
                            <Card shaded="hover" size="sm">
                                <Image
                                    zoomed
                                    src={featuredPost.picture}
                                    alt={featuredPost.title}
                                    loading="lazy"
                                    onLoad={(e) => {
                                        (e.currentTarget as HTMLImageElement).style.backgroundImage = "none";
                                    }}
                                    style={{
                                        maxHeight: '300px',
                                        margin: 'auto',
                                        display: 'block',
                                        objectFit: 'cover',
                                        backgroundImage: `url(${placeholderImage})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                />
                                <Card.Header as="h5">
                                    {featuredPost.title}
                                </Card.Header>
                                <Card.Body>
                                    {featuredPost.news.replace(/<[^>]+>/g, '').substring(0, 230)}
                                </Card.Body>
                                <Card.Footer>
                                    <Text muted>{featuredPost.rl_date}</Text>
                                </Card.Footer>
                            </Card>
                        )}
                    </Panel>
                </Col>
                <Col sm={12}>
                    <Panel
                        header="Popular Posts"
                        style={{
                            background: "var(--rs-body)",
                        }}
                    >
                        <Row>
                            {popularPosts.map((item, index) => (
                                <Col sm={24} key={index} style={{marginBottom: '10px'}}>
                                    <Card
                                        size="sm"
                                        shaded="hover"
                                        direction="row"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Image
                                            zoomed
                                            src={item.picture}
                                            alt={item.title}
                                            style={{
                                                maxHeight: '150px',
                                                margin: 'auto',
                                                display: 'block',
                                                objectFit: 'cover',
                                                backgroundImage: `url(${placeholderImage})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        />
                                        <VStack spacing={2}>
                                            <Card.Header as="h5">{item.title}</Card.Header>
                                            <Card.Body>
                                                {item.news.replace(/<[^>]+>/g, '').substring(0, 110)}
                                            </Card.Body>
                                            <Card.Footer>
                                                <Text muted>{item.rl_date}</Text>
                                            </Card.Footer>
                                        </VStack>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Panel>
                </Col>
            </Row>
            <Row>
                <Panel
                    header="New Posts"
                    style={{
                        background: "var(--rs-body)",
                    }}
                >
                    {newPosts?.map((item, index) => {
                        if (newPosts.length === index + 1) {
                            return (
                                <Col sm={24} ref={lastElement} key={index} style={{marginBottom: '10px'}}>
                                    <Card
                                        size="sm"
                                        shaded="hover"
                                        direction="row"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Image
                                            zoomed
                                            src={item.picture}
                                            alt={item.title}
                                            style={{
                                                maxHeight: '150px',
                                                margin: 'auto',
                                                display: 'block',
                                                objectFit: 'cover',
                                                backgroundImage: `url(${placeholderImage})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        />
                                        <VStack spacing={2}>
                                            <Card.Header as="h5">{item.title}</Card.Header>
                                            <Card.Body>
                                                {item.news.replace(/<[^>]+>/g, '').substring(0, 110)}
                                            </Card.Body>
                                            <Card.Footer>
                                                <Text muted>{item.rl_date}</Text>
                                            </Card.Footer>
                                        </VStack>
                                    </Card>
                                </Col>
                            )
                        } else {
                            return (
                                <Col sm={24} key={index} style={{marginBottom: '10px'}}>
                                    <Card
                                        size="sm"
                                        shaded="hover"
                                        direction="row"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Image
                                            zoomed
                                            src={item.picture}
                                            alt={item.title}
                                            style={{
                                                maxHeight: '150px',
                                                margin: 'auto',
                                                display: 'block',
                                                objectFit: 'cover',
                                                backgroundImage: `url(${placeholderImage})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        />
                                        <VStack spacing={2}>
                                            <Card.Header as="h5">{item.title}</Card.Header>
                                            <Card.Body>
                                                {item.news.replace(/<[^>]+>/g, '').substring(0, 110)}
                                            </Card.Body>
                                            <Card.Footer>
                                                <Text muted>{item.rl_date}</Text>
                                            </Card.Footer>
                                        </VStack>
                                    </Card>
                                </Col>
                            )
                        }
                    })}
                </Panel>
            </Row>
            {isFetching &&
                <div className="d-flex justify-content-center my-4">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
        </>
    );
};

export default News;
