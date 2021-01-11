<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;

/**
 * @ORM\Entity()
 *
 * @ApiResource(
 *     collectionOperations={
 *          "get"={"normalization_context"={"groups"="conference:list"}},
 *          "post"={"normalization_context"={"groups"="conference:item"}},
 *     },
 *      itemOperations={
 *          "get",
 *         "delete",
 *      },
 *     order={"created_at"="DESC"},
 *     paginationEnabled=false
 * )
 * @ApiFilter(DateFilter::class, properties={"created_at"})
 *
 */
class Purse
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     *
     * @Groups({"conference:list", "conference:item"})
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     *
     * @Groups({"conference:list", "conference:item"})
     */
    private $title;

    /**
     * @ORM\Column(type="float", precision=2, scale=11, nullable=true)
     *
     * @Groups({"conference:list", "conference:item"})
     */
    private $price;

    /**
     *
     * @Assert\Type("\DateTimeInterface")
     *
     * @Groups({"conference:list", "conference:item"})
     * @ORM\Column(type="datetime")
     */
    private $created_at;

    public function __construct()
    {
       $this->created_at = new DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getCreatedAt(): ?string
    {
        return $this->created_at->format('Y-m-d H:i:s');
    }

    public function setCreatedAt(?string $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }
}
