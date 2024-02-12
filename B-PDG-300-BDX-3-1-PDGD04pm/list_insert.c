/*
** EPITECH PROJECT, 2022
** list
** File description:
** list
*/

#include "include/list.h"

node_t *new_node(void *elem) {
  node_t *node = malloc(sizeof(node_t));

  if (!node)
    return false;
  node->value = elem;
  node->next = NULL;
  return (node);
}

bool list_add_elem_at_front(list_t *front_ptr, void *elem) {
  node_t *node = new_node(elem);

  if (!node)
    return false;
  node->next = *front_ptr;
  *front_ptr = node;
  return true;
}

bool list_add_elem_at_back(list_t *front_ptr, void *elem) {
  node_t *node = new_node(elem);
  list_t tmp = *front_ptr;

  if (!node)
    return false;
  if (*front_ptr == NULL) {
    *front_ptr = node;
    return true;
  }

  while (tmp->next != NULL)
    tmp = tmp->next;

  tmp->next = node;
  return true;
}

bool list_add_elem_at_position(list_t *front_ptr, void *elem,
                               unsigned int position) {
  node_t *node = new_node(elem);
  list_t tmp = *front_ptr;
  unsigned int i = 0;

  if (!node)
    return false;
  while (i != position) {
    tmp = tmp->next;
    if (tmp == NULL)
      return false;
    i++;
  }
  tmp->next = node;
  return true;
}
