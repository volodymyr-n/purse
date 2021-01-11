<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class PurseController extends AbstractController
{
    /**
     * @Route("/{reactRouting}", name="index", requirements={"reactRouting"="^(?!api).+"},  defaults={"reactRouting": null})
     */
    public function index(): Response
    {
        return $this->render('purse/index.html.twig', [
            'controller_name' => 'PurseController',
        ]);
    }

}
